/**
 * A tiny PDF writer for the printable menu: each page is one full-bleed image.
 * Takes the PNGs that next/og renders, unfilters them to raw RGB and embeds
 * them with FlateDecode. Server only (node:zlib).
 */
import { deflateSync, inflateSync } from "node:zlib";

interface Raster {
  width: number;
  height: number;
  rgb: Buffer;
}

/** Decodes an 8-bit RGB or RGBA PNG (what satori/resvg produce) to raw RGB. */
export function decodePng(png: Buffer): Raster {
  let pos = 8;
  let width = 0;
  let height = 0;
  let type = 0;
  const idat: Buffer[] = [];
  while (pos < png.length) {
    const len = png.readUInt32BE(pos);
    const kind = png.toString("latin1", pos + 4, pos + 8);
    const data = png.subarray(pos + 8, pos + 8 + len);
    if (kind === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || (data[9] !== 2 && data[9] !== 6) || data[12] !== 0) throw new Error("unsupported PNG");
      type = data[9];
    } else if (kind === "IDAT") idat.push(data);
    else if (kind === "IEND") break;
    pos += 12 + len;
  }
  const bpp = type === 6 ? 4 : 3;
  const stride = width * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const cur = Buffer.alloc(stride);
  const prev = Buffer.alloc(stride);
  const rgb = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      let v = line[i];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = v & 255;
    }
    for (let x = 0; x < width; x++) {
      // the pages are opaque; alpha (if any) is dropped
      rgb[(y * width + x) * 3] = cur[x * bpp];
      rgb[(y * width + x) * 3 + 1] = cur[x * bpp + 1];
      rgb[(y * width + x) * 3 + 2] = cur[x * bpp + 2];
    }
    cur.copy(prev);
  }
  return { width, height, rgb };
}

/** One A4 page per image, the image filling the page. */
export function imagesToPdf(pages: Raster[], title: string): Buffer {
  const A4: [number, number] = [595.28, 841.89];
  const objs: (string | Buffer)[][] = [];
  const add = (...parts: (string | Buffer)[]) => objs.push(parts) ;
  const esc = (s: string) => s.replace(/[\\()]/g, (m) => "\\" + m).replace(/[^\x20-\x7e]/g, "");
  // 1 catalog, 2 pages, 3 info, then per page: page, content, image
  const kids = pages.map((_, i) => `${4 + i * 3} 0 R`).join(" ");
  add(`<< /Type /Catalog /Pages 2 0 R >>`);
  add(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`);
  add(`<< /Title (${esc(title)}) /Producer (Garnish) >>`);
  pages.forEach((p, i) => {
    const n = 4 + i * 3;
    const draw = `q ${A4[0]} 0 0 ${A4[1]} 0 0 cm /Im0 Do Q`;
    const data = deflateSync(p.rgb, { level: 9 });
    add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4[0]} ${A4[1]}] /Resources << /XObject << /Im0 ${n + 2} 0 R >> >> /Contents ${n + 1} 0 R >>`);
    add(`<< /Length ${draw.length} >>\nstream\n${draw}\nendstream`);
    add(`<< /Type /XObject /Subtype /Image /Width ${p.width} /Height ${p.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${data.length} >>\nstream\n`, data, `\nendstream`);
  });
  const chunks: Buffer[] = [Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1")];
  let size = chunks[0].length;
  const offsets: number[] = [];
  objs.forEach((parts, i) => {
    offsets.push(size);
    const buf = Buffer.concat([Buffer.from(`${i + 1} 0 obj\n`, "latin1"), ...parts.map((x) => (typeof x === "string" ? Buffer.from(x, "latin1") : x)), Buffer.from("\nendobj\n", "latin1")]);
    chunks.push(buf);
    size += buf.length;
  });
  const xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("")}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${size}\n%%EOF\n`;
  chunks.push(Buffer.from(xref, "latin1"));
  return Buffer.concat(chunks);
}
