export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <p className="min-w-0 truncate text-sm font-semibold text-slate-800">
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-rose-300 ${
            isFavourite
              ? "bg-rose-50 text-rose-600"
              : "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}