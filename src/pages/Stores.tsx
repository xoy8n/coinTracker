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
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    gcTime: 20 * 60 * 10, // 20분
    staleTime: 10 * 60 * 1000, // 10분
  });

  useEffect(() => {
    const handleScroll = () => {
      console.log(
        `innerHeight : ${window.innerHeight}, scrollY : ${window.scrollY}, 현재 페이지의 실제 높이 : ${document.body.offsetHeight}`,
      );
      if (
        //브라우저 창 내부높이(사용자가 보는 브라우저창높이) + 스크롤 된 Y축 위치값 >= 현재 페이지의 모든 콘텐츠의 높이(브라우저에 보이지않는 페이지의 아이템끝까지의 길이)
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      ) {
        console.log("onEndScroll, 다음페이지 블러오는중");
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      //eventListener 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const content = data?.pages.map((stores: IStoreInterface[], index) =>
    stores.map((store) => (
      <Store key={store.id} style={{ marginBottom: "20px" }}>
        <Link
          to={{
            pathname: `/${store.id}`,
            state: { name: store.title },
          }}
        >
          {store.title} &rarr;
        </Link>
      </Store>
    )),
  );

  if (isLoading) {
    return <Loader>loading...</Loader>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
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
