export interface IStoreInterface {
  id: string;
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
