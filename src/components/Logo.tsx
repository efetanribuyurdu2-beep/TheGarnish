/** The Garnish mark: a fine-line martini with an olive, optionally ringed. Colour follows currentColor. */
function GlassMark() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="50" x2="69" y2="-38" strokeWidth="2.5" />
      <circle cx="71" cy="-41" r="5.5" fill="currentColor" stroke="none" />
      <ellipse cx="0" cy="0" rx="80" ry="5" strokeWidth="2.5" />
      <path
        d="M-80 1 L-10 72 C-4 78 -3.2 86 -3.2 96 L-3.6 148 C-4 160 -18 166 -48 170 L48 170 C18 166 4 160 3.6 148 L3.2 96 C3.2 86 4 78 10 72 L80 1"
        strokeWidth="2.5"
      />
      <ellipse cx="37" cy="21" rx="14" ry="10" transform="rotate(-42 37 21)" fill="var(--bg)" strokeWidth="2.5" />
      <ellipse cx="44" cy="15" rx="4.5" ry="3.5" transform="rotate(-42 44 15)" strokeWidth="2" />
    </g>
  );
}

export function LogoMark({ size = 40, title = "Garnish" }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="-120 -120 240 240" role="img" aria-label={title}>
      <circle r="110" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle r="100" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <g transform="translate(0 -44) scale(.62)">
        <GlassMark />
      </g>
    </svg>
  );
}

export function LogoFull({ width = 260 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 400 380" role="img" aria-label="Garnish — Cocktail Worlds" className="logo-full">
      <g transform="translate(200 150)">
        <circle r="110" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle r="102" fill="none" stroke="currentColor" strokeWidth=".6" />
        <g transform="translate(0 -44) scale(.62)" className="logo-glass">
          <GlassMark />
        </g>
      </g>
      <text x="200" y="320" textAnchor="middle" fontSize="42" letterSpacing="11" fill="currentColor" style={{ fontFamily: "var(--font-brand)" }}>
        GARNISH
      </text>
      <line x1="58" y1="348" x2="92" y2="348" stroke="currentColor" strokeWidth=".8" />
      <line x1="308" y1="348" x2="342" y2="348" stroke="currentColor" strokeWidth=".8" />
      <text x="200" y="353" textAnchor="middle" fontSize="13" letterSpacing="5" fill="currentColor" style={{ fontFamily: "var(--font-body)" }}>
        COCKTAIL WORLDS
      </text>
    </svg>
  );
}
