import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchStores } from "../api/api";
import {
  Container,
  Header,
  StoresList,
  Store,
  Title,
  Loader,
  LikeCount,
} from "../style/StoresStyle";
import { IStoreInterface } from "../types/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LikeButton from "../components/LikeButton";

const Stores = () => {
  const location = useLocation();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    refetch,
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

  useEffect(() => {
    // Location 객체가 변경될 때마다 refetch 호출
    refetch();
  }, [location]);

  return (
    <Container>
      <Header>
        <Title>리스트</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <StoresList>
          {data?.pages.map((page) =>
            page.data.list.map((store: IStoreInterface) => (
              <Store key={store.bbsSeq} style={{ marginBottom: "20px" }}>
                <Link to={`/${store.bbsSeq}`} state={{ name: store.title }}>
                  {store.title} &rarr;
                </Link>
                <LikeButton store={store} refetch={refetch} />
                <LikeCount>{store.likes}</LikeCount>
              </Store>
            )),
          )}
          {isFetchingNextPage && hasNextPage ? (
            <>
              <h3>로딩중...</h3>
            </>
          ) : (
            <h3>목록 끝!</h3>
          )}
        </StoresList>
      )}
    </Container>
  );
};

export default Stores;
