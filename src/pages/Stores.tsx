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
import LikeButton from "../components/LikeButton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Stores = () => {
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
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? lastPage.data.nextPage : undefined;
    },
    gcTime: 20 * 60 * 10, // 20분
    staleTime: 10 * 60 * 1000, // 10분
  });

  // 커스텀 훅을 사용하여 무한 스크롤 처리
  useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage);

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  const content = data?.pages.map((page) =>
    page.data.list.map((store: IStoreInterface) => (
      <Store key={store.bbsSeq} style={{ marginBottom: "20px" }}>
        <Link to={`/${store.bbsSeq}`} state={{ name: store.title }}>
          {store.title} &rarr;
        </Link>
        <LikeButton storeId={store.bbsSeq} />
      </Store>
    )),
  );

  return (
    <Container>
      <Header>
        <Title>리스트</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <StoresList>
          {content}
          {isFetchingNextPage && hasNextPage ? (
            <h3>로딩중...</h3>
          ) : (
            <h3>목록 끝!</h3>
          )}
        </StoresList>
      )}
    </Container>
  );
};

export default Stores;
