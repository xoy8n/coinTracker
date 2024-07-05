import { Switch, Route, useParams, useRouteMatch } from "react-router";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { IStoreInterface } from "./Stores";

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

interface IInfoData extends IStoreInterface {
  address_1: string;
  address_2?: string;
  brewery_type: string;
  city: string;
  country: string;
  phone: string;
  state: string;
  postal_code: string;
  street: string;
  website_url: string;
}

function Store() {
  const [loading, setLoading] = useState(true);
  const { storeId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  /*useRouteMatch : 특정 url에 내가 있는지 검사*/
  const priceMatch = useRouteMatch("/:coinId/price");
  console.log(priceMatch);

  /* 내장함수 fetch만을 사용했을 때(.json()으로 가져오기)  */
  // useEffect(() => {
  //     (async () => {
  //         const infoData = await (
  //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //         ).json();
  //         const priceData = await (
  //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //         ).json();
  //         setInfo(infoData);
  //         console.log(infoData);
  //         setPriceInfo(priceData);
  //         console.log(priceData);
  //         setLoading(false);
  //     })();
  // }, [coinId]);

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
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            {/*<OverviewItem>*/}
            {/*  <span>:</span>*/}
            {/*  <span>{info?.rank}</span>*/}
            {/*</OverviewItem>*/}
            {/*<OverviewItem>*/}
            {/*  <span>Symbol:</span>*/}
            {/*  <span>${info?.symbol}</span>*/}
            {/*</OverviewItem>*/}
            {/*<OverviewItem>*/}
            {/*  <span>Open Source:</span>*/}
            {/*  <span>{info?.open_source ? "Yes" : "No"}</span>*/}
            {/*</OverviewItem>*/}
          </Overview>
          <Description>{info?.website_url}</Description>
          <Description>{`${info?.country}, ${info?.state}, ${info?.city}, ${info?.address_2}, ${info?.address_1}`}</Description>
          <Description>{info?.phone}</Description>
          <Overview>
            {/*<OverviewItem>*/}
            {/*  <span>Total Supply:</span>*/}
            {/*  <span>{priceInfo?.total_supply}</span>*/}
            {/*</OverviewItem>*/}
            {/*<OverviewItem>*/}
            {/*  <span>Max Supply:</span>*/}
            {/*  <span>{priceInfo?.max_supply}</span>*/}
            {/*</OverviewItem>*/}
          </Overview>
          <Tabs>
            <Tab>
              <Link to={`/${storeId}/price`}>Price</Link>
            </Tab>
            <Tab>
              <Link to={`/${storeId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:storeId/price`}>
              <Price />
            </Route>
            <Route path={`/:storeId/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Store;
