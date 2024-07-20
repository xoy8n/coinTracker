export interface IStoreInterface {
  likes: number;
  bbsSeq: number;
  title: string;
}

export interface IPageParam {
  pageParam: number;
}

export interface StoreRouteParams {
  storeId: string;
}

export interface StoreRouteState {
  name: string;
}

export interface ILikeProps {
  likeSeq: number;
  bbsSeq: number;
}
