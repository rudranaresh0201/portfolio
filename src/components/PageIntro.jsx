import Reveal from './Reveal';

/**
 * The masthead each subpage opens with. `index` is the page's position in the
 * nav, which is real information here: it tells you where you are in a set of
 * three, the way a section marker on a long page used to.
 */
export default function PageIntro({ index, total, eyebrow, title, lede }) {
  return (
    <Reveal className="pt-14 pb-10">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="label">{eyebrow}</span>
        <span className="flex-1 h-px bg-line" />
        <span className="font-mono text-2xs text-faint tabular-nums">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-3">
        {title}
      </h1>
      <p className="text-dim leading-relaxed max-w-xl">{lede}</p>
    </Reveal>
  );
}
