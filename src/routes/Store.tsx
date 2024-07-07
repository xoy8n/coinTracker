import { Switch, Route, useParams, useRouteMatch } from "react-router";
import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { IStoreInterface } from "../types/store";

interface RouteParams {
  storeId: string;
}

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  a {
    display: block;
    padding: 7px 0;
  }
`;

interface RouteState {
  name: string;
}

export interface IInfoData extends React.HTMLAttributes<HTMLElement> {
  store : IStoreInterface
  address_1?: string;
  address_2?: string;
  city?: string;
  phone?: string;
  state?: string;
  street?: string;
  website_url?: string;
}



function Store(){
  const [loading, setLoading] = useState(true);
  const { storeId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  /*useRouteMatch : 특정 url에 내가 있는지 검사*/
  const priceMatch = useRouteMatch("/:coinId/price");
  console.log(priceMatch);

  /* axios 리아브러리 사용(.data로 가져오기) */
  useEffect(() => {
    (async () => {
      try {
        const infoData = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${storeId}`,
        );
        setInfo(infoData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, [storeId]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.store.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Description>{info?.website_url}</Description>
          <Description>{`${info?.state}, ${info?.city}, ${info?.address_2}, ${info?.address_1}`}</Description>
          <Description>{info?.phone}</Description>
          <Tabs>
            <Tab>
              <Link to={`/${storeId}/price`}>Price</Link>
            </Tab>
            <Tab>
              <Link to={`/${storeId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          {/*<Switch>*/}
          {/*  <Route path={`/:storeId/price`}>*/}
          {/*    <Price />*/}
          {/*  </Route>*/}
          {/*  <Route path={`/:storeId/chart`}>*/}
          {/*    <Chart />*/}
          {/*  </Route>*/}
          {/*</Switch>*/}
        </>
      )}
    </Container>
  );
}

export default Store;
