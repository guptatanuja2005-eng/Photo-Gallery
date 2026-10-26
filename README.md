# Photo Gallery

A React + Vite + Tailwind CSS photo gallery built for the Celebrare frontend assignment.

## Included requirements
- Fetches 30 photos from the Picsum Photos API with loading and error states.
- Responsive gallery: 1 column on mobile, 2 on tablet, 4 on desktop.
- Real-time author-name search filters the fetched list locally.
- Favourites are managed with `useReducer` and persisted to `localStorage`.
- Fetch logic lives in the `useFetchPhotos` custom hook.
- `useCallback` is used for the search handler and favourite toggle.
- `useMemo` computes the filtered photo list.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Implementation notes
- The API supplies author names and photo IDs. Gallery images use Picsum's image endpoint for consistent thumbnail dimensions.
- Favourite state stores photo IDs, not entire photo objects.
- `useFetchPhotos` aborts its fetch when the component unmounts.
- Search filters the already-fetched array and never makes another API request.
