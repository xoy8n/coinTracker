export interface IStoreInterface {
  likeYn: "Y" | "N";
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

export interface IlikeProps {
  bbsSeq: number;
  employeeSeq: number;
  likeYn?: boolean;
}
