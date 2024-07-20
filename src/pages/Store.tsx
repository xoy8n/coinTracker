import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchDetailStore } from "../api/api";
import {
  Container,
  Header,
  Title,
  Loader,
  Description,
  ContentBox,
} from "../style/StoreStyle";
import { useQuery } from "@tanstack/react-query";
import LikeButton from "../components/LikeButton";

function Store() {
  //URL경로매개변수는 항상 문자열을 반환(parseInt, Number 를 쓰지 않고는 숫자로 타입지정안됨)
  const { storeId } = useParams<{ storeId: string }>();
  const location = useLocation();
  const bbsSeq = Number(storeId);

  const { isLoading, data } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => {
      if (!storeId) {
        throw new Error("storeId is undefined");
      }
      return fetchDetailStore({ storeId });
    },
    staleTime: 4 * 60 * 1000, // 4분
    gcTime: 20 * 60 * 1000,
  });

  return (
    <Container>
      <Header>
        <Title>{location.state.name ?? data?.data.title}</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <ContentBox>
            <Description>{data?.data.contents}</Description>
            <LikeButton storeId={bbsSeq} />
          </ContentBox>
        </>
      )}
    </Container>
  );
}

export default Store;
