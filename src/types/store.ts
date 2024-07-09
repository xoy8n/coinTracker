export interface IStoreInterface {
  id: string;
  title: string;
}

export type StoreRouteParams = {
  storeId: string;
};

export type StoreRouteState = {
  name: string;
};
