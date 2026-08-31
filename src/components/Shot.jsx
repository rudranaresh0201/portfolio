/**
 * A screenshot of the real thing, with a caption saying what you are looking
 * at. Only used where a genuine artifact exists: a project with nothing to
 * show gets no image rather than a placeholder.
 */
export function Thumb({ src, alt }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${src}`}
      alt={alt}
      loading="lazy"
      className="w-24 h-14 object-cover rounded border border-line shrink-0
                 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
    />
  );
}

export default function Shot({ src, caption, alt }) {
  return (
    <figure className="my-4">
      <img
        src={`${import.meta.env.BASE_URL}${src}`}
        alt={alt || caption}
        loading="lazy"
        className="w-full rounded-md border border-line block"
      />
      {caption && (
        <figcaption className="font-mono text-2xs text-faint mt-2 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
