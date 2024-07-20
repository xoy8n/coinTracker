import create from "zustand";

interface LikeState {
  likedStores: Record<number, boolean>;
  toggleLike: (storeId: number) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  likedStores: {}, // 초기 상태: 빈 객체
  toggleLike: (storeId) =>
    set((state) => ({
      likedStores: {
        ...state.likedStores, // 현재 상태를 복사
        [storeId]: !state.likedStores[storeId], // storeId의 좋아요 상태를 토글
      },
    })),
}));
