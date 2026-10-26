import { useCallback, useMemo, useReducer, useState, useEffect } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos.js";
import PhotoCard from "./components/PhotoCard.jsx";
import { favouritesReducer, loadSavedFavourites } from "./reducer/favouritesReducer.js";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadSavedFavourites
  );

  useEffect(() => {
    localStorage.setItem("photo-gallery-favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, searchTerm]);

  const toggleFavourite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE", photoId });
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Photo Gallery</h1>
            <p className="text-sm text-slate-500">A little inspiration, one photo at a time.</p>
          </div>
        </div>

        <label htmlFor="photo-search" className="mb-2 block text-sm font-semibold text-slate-700">
          Search by author
        </label>
        <div className="relative max-w-xl">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path strokeLinecap="round" d="m16 16 4.5 4.5" />
          </svg>
          <input
            id="photo-search"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type an author name..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>
        {!loading && !error && (
          <p className="mt-3 text-sm text-slate-500" aria-live="polite">
            Showing {filteredPhotos.length} of {photos.length} photos
            <span className="mx-2 text-slate-300">·</span>
            {favourites.length} {favourites.length === 1 ? "favourite" : "favourites"}
          </p>
        )}
      </header>

      {loading && (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-slate-500" role="status">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
          <p className="text-sm font-medium">Loading photos…</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700" role="alert">
          Could not load photos: {error}
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <p className="font-semibold text-slate-800">No photos found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different author name.</p>
        </div>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <section aria-label="Photo gallery" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </section>
      )}
    </main>
  );
}