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
  LikeCount,
} from "../style/StoresStyle";
import { IStoreInterface } from "../types/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LikeButton from "../components/LikeButton";
import useLikeButtonRefetchStore from "../stores/likeButtonRefetchStore";

const Stores = () => {
  const { refetchYn, setRefetchYn } = useLikeButtonRefetchStore();
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
    // gcTime: 20 * 60 * 1000, // 20분
    // staleTime: 10 * 60 * 1000, // 10분
    refetchOnMount: refetchYn,
  });

  // 커스텀 훅을 사용하여 무한 스크롤 처리
  useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage);

  //좋아요 버튼을 눌렀을 때만 무한쿼리 Refetch
  useEffect(() => {
    // return () => {
    if (refetchYn) {
      refetch();
    }
    setRefetchYn(false);
    // };
  }, [refetchYn]);

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
              <Store key={store.bbsSeq}>
                <Link to={`/${store.bbsSeq}`} state={{ name: store.title }}>
                  {store.title} &rarr;
                </Link>
                <LikeButton store={store} refetch={refetch} />
                <LikeCount>{store.likes}</LikeCount>
              </Store>
            )),
          )}
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
