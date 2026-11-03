/**
 * Turns a React SVG tree (hook-free components only) into an SVG string, so the
 * hand-drawn glasses can be embedded in share-card images on the server.
 */
import { Fragment, isValidElement, type ReactNode } from "react";

// SVG attributes that keep their camelCase spelling
const KEEP = new Set([
  "viewBox", "preserveAspectRatio", "gradientUnits", "gradientTransform", "patternUnits", "patternContentUnits",
  "patternTransform", "stdDeviation", "spreadMethod", "textLength", "lengthAdjust", "markerWidth", "markerHeight",
  "refX", "refY", "startOffset", "baseFrequency", "numOctaves", "clipPathUnits", "maskUnits", "maskContentUnits",
  "filterUnits", "primitiveUnits", "pathLength", "tableValues", "kernelMatrix", "diffuseConstant", "specularExponent",
]);
const SKIP = new Set(["children", "key", "ref", "dangerouslySetInnerHTML"]);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

function attr(name: string, value: unknown): string {
  if (value === undefined || value === null || value === false || SKIP.has(name) || typeof value === "function") return "";
  if (name === "className") name = "class";
  else if (name === "xlinkHref") name = "xlink:href";
  else if (name === "style" && typeof value === "object") {
    const css = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${kebab(k)}:${v}`)
      .join(";");
    return css ? ` style="${esc(css)}"` : "";
  } else if (!KEEP.has(name) && !name.startsWith("aria") && !name.startsWith("data")) name = kebab(name);
  return ` ${name}="${esc(String(value === true ? "" : value))}"`;
}

export function svgString(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return esc(String(node));
  if (Array.isArray(node)) return node.map(svgString).join("");
  if (!isValidElement(node)) return "";
  const { type } = node;
  const props = node.props as Record<string, unknown> & { children?: ReactNode };
  if (type === Fragment) return svgString(props.children);
  if (typeof type === "function") return svgString((type as (p: unknown) => ReactNode)(props));
  if (typeof type !== "string") return "";
  let open = `<${type}`;
  if (type === "svg") open += ` xmlns="http://www.w3.org/2000/svg"`;
  for (const [k, v] of Object.entries(props)) open += attr(k, v);
  const inner = svgString(props.children);
  return inner ? `${open}>${inner}</${type}>` : `${open}/>`;
}

export const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
