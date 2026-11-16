/**
 * Block369 logo: "BL□CK369" u gradijentu.
 * TODO: privremena verzija u kodu (font "Lighters" nije dostupan na webu).
 * Kada stigne SVG logo, staviti ga u public/logo.svg i ovde ga prikazati preko <Image>.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-heading font-light uppercase tracking-[0.18em] ${className}`}
      aria-label="Block369"
    >
      <span aria-hidden className="text-brand-gradient inline-flex items-center">
        BL
        <span className="frame-gradient mx-[0.06em] inline-block h-[0.72em] w-[0.72em] border-[0.09em]" />
        CK369
      </span>
    </span>
  );
}

/** Dekorativni kvadratni okviri iz brandbooka. */
export function SquareFrames({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="frame-gradient absolute right-0 top-0 h-56 w-56 border-[14px]" />
      <div className="frame-gradient absolute right-24 top-24 h-40 w-40 border-[10px] opacity-80" />
    </div>
  );
}
