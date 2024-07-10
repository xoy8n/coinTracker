import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchStores } from "../api/api";
import {
  Container,
  Header,
  StoresList,
  Store,
  Title,
  Loader,
} from "../style/StoresStyle";
import { IStoreInterface } from "../types/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const Stores = () => {
  const { ref, inView } = useInView({});
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["allStores"],
    queryFn: fetchStores,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      console.log(lastPage.length, allPages.length, lastPageParam);
      return lastPage.length === allPages.length
        ? undefined
        : allPages.length + 1;
    },
    gcTime: 20 * 60 * 10, //20분 (구 : cacheTime)
    staleTime: 10 * 60 * 1000, //10분
  });

  console.log(data?.pages);

  const content = data?.pages.map((stores: IStoreInterface[]) =>
    stores.map((store) => {
      return (
        <Store ref={ref} key={store.id} style={{ marginBottom: "20px" }}>
          <Link
            to={{
              pathname: `/${store.id}`,
              state: { name: store.title },
            }}
          >
            {store.title} &rarr;
          </Link>
        </Store>
      );
    }),
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log(inView, "무한 스크롤 요청", hasNextPage);
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Loader>loading...</Loader>;
  }

  if (status === "error") {
    return <p>Error : {error.message} </p>;
  }

  return (
    <Container>
      <Header>
        <Title>리스트</Title>
      </Header>
      <StoresList>
        {content}
        {isFetchingNextPage && hasNextPage ? (
          <h3>로딩중...</h3>
        ) : (
          <h3>목록 끝!</h3>
        )}
      </StoresList>
    </Container>
  );
};

export default Stores;
