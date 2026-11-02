/** World divider: two ornamental bands around the world's emblem (all drawn by the theme kit). */
export function Ornament({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`ornament ${wide ? "wide" : ""}`} aria-hidden>
      <i className="band" />
      <span className="emblem" />
      <i className="band" />
    </div>
  );
}
