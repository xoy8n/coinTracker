import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchDetailStore } from "../api/api";
import {
  Container,
  Header,
  Title,
  Loader,
  Description,
  ContentBox,
  LikeCountComment,
  LikeCount,
} from "../style/StoreStyle";
import { useQuery } from "@tanstack/react-query";
import LikeButton from "../components/LikeButton";

function Store() {
  //URL경로매개변수는 항상 문자열을 반환(parseInt, Number 를 쓰지 않고는 숫자로 타입지정안됨)
  const { storeId } = useParams<{ storeId: string }>();
  const location = useLocation();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => {
      if (!storeId) {
        throw new Error("storeId is undefined");
      }
      return fetchDetailStore({ storeId });
    },
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
            <p>{location.state.isLiked}</p>
            <LikeButton store={data.data} refetch={refetch} />
          </ContentBox>
          <LikeCountComment>
            <LikeCount>{data?.data.likes}</LikeCount>
            {data?.data.likes === 0 ? "명이 좋아합니다🥺" : "명이 좋아합니다🥰"}
          </LikeCountComment>
        </>
      )}
    </Container>
  );
}

export default Store;
