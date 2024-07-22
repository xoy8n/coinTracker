import create from "zustand";

interface LikeState {
  likedStores: Record<number, boolean>;
  toggleLike: (storeId: number) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  likedStores: {},
  toggleLike: (storeId) =>
    set((state) => {
      state.likedStores[storeId] = !state.likedStores[storeId];
      return state.likedStores;
    }),
}));
