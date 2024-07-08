import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchDetailStore } from "../api";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

interface RouteParams {
  storeId: string;
}

//styles
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Description = styled.p`
  margin: 20px 0;
`;

//interface
interface RouteState {
  name: string;
}

//functional component
const Store = () => {
  //URL매개변수는 기본적으로 문자열을 반환(parseInt를 쓰지 않고는 숫자로 타입지정안됨)
  const { storeId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const { isLoading, data } = useQuery({
    queryKey: ["info", storeId],
    queryFn: () => fetchDetailStore(storeId),
    staleTime: 10 * 60 * 1000, //10분
  });

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : data?.title}
        </Title>
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
};

export default Store;
