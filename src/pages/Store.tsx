import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchDetailStore } from "../api/api";
import {
  Container,
  Header,
  Title,
  Loader,
  Description,
} from "../style/StoreStyle";
import { useQuery } from "@tanstack/react-query";
import { StoreRouteParams, StoreRouteState } from "../types/store";

function Store() {
  //URL경로매개변수는 항상 문자열을 반환(parseInt, Number 를 쓰지 않고는 숫자로 타입지정안됨)
  const { storeId } = useParams<StoreRouteParams>();
  const { state } = useLocation<StoreRouteState>();

  const { isLoading, data } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => fetchDetailStore(storeId),
    staleTime: 4 * 60 * 1000, //4분
    gcTime: 1000, //1초
  });

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : data?.title}</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Description>{data?.body}</Description>
        </>
      )}
    </Container>
  );
}

export default Store;
