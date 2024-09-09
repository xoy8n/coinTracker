import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface likeButtonRefetchStore {
  refetchYn: boolean;
  setRefetchYn: (value: boolean) => void;
}

const useLikeButtonRefetchStore: any = create(
  devtools(
    immer<likeButtonRefetchStore>((set) => ({
      refetchYn: false,
      setRefetchYn: (refetchYn: boolean) => set({ refetchYn }),
    })),
  ),
);

export default useLikeButtonRefetchStore;
