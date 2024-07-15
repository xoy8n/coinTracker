import { useParams, useLocation } from "react-router-dom";
import { fetchDetailStore } from "../api/api";
import {
  Container,
  Header,
  Title,
  Loader,
  Description,
} from "../style/StoreStyle";
import { useQuery } from "@tanstack/react-query";
// import { StoreRouteParams, StoreRouteState } from "../types/store";

function Store() {
  //URL경로매개변수는 항상 문자열을 반환(parseInt, Number 를 쓰지 않고는 숫자로 타입지정안됨)
  const params = useParams<{ storeId: string }>();
  const location = useLocation();

  const { isLoading, data } = useQuery({
    queryKey: ["store", params.storeId],
    queryFn: () => {
      if (!params.storeId) {
        throw new Error("storeId is undefined");
      }
      return fetchDetailStore(params.storeId);
    },
    staleTime: 4 * 60 * 1000, //4분
  });

  const state = location.state as string;
  console.log(state);
  return (
    <Container>
      <Header>
        <Title>{location.state.name ?? data?.title}</Title>
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
