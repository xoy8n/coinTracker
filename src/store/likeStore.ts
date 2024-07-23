import create from "zustand";

interface LikeState {
  likedStores: Record<number, boolean>;
  toggleLike: (storeId: number) => void;
}

const getInitialLikedStores = (): Record<number, boolean> => {
  //로컬 스토리지에서 "likedStores" 키에 저장된 데이터(JSON 문자열 형식)
  const likedStores = localStorage.getItem("likedStores");
  // 로컬 스토리지에서 데이터를 불러올 때 : JSON문자열을 JS객체로 변환(parse)
  return likedStores ? JSON.parse(likedStores) : {};
};

export const useLikeStore = create<LikeState>((set) => ({
  likedStores: getInitialLikedStores(),
  toggleLike: (storeId) =>
    set((state) => {
      //undefined이면 true로 처음클릭시 저장
      state.likedStores[storeId] = !state.likedStores[storeId];
      // 로컬 스토리지에 데이터를 저장할 때 : 객체형태(Parse)로 되어있는 데이터를 JSON 문자열로 변환(stringify)
      localStorage.setItem("likedStores", JSON.stringify(state.likedStores));
      // 수정된 상태 객체를 반환하여 상태 업데이트
      return { likedStores: state.likedStores };
    }),
}));
