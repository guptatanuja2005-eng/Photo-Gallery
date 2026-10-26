export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const alreadySaved = state.includes(action.photoId);
      return alreadySaved
        ? state.filter((id) => id !== action.photoId)
        : [...state, action.photoId];
    }
    default:
      return state;
  }
}

export function loadSavedFavourites() {
  try {
    const stored = localStorage.getItem("photo-gallery-favourites");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}