import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

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

const StoresList = styled.ul``;

const Store = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const LoadMoreButton = styled.button`
  width: 300px;
  height: 50px;
`;

// const CoinImg = styled.img`
//   width: 35px;
//   height: 35px;
// `;

export interface IStoreInterface {
  id: string;
  name: string;
}

const fetchStores = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(
    `https://api.openbrewerydb.org/v1/breweries?by_country=south%20korea&per_page=${pageParam}`,
  );
  return response.data;
};

function Stores() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    initialPageParam: 10,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return (
    <Container>
      <Header>
        <Title>🥃술집목록🍺</Title>
      </Header>
      {isFetching ? (
        <Loader>Loading...</Loader>
      ) : (
        <StoresList>
          {data?.pages.map((page) =>
            page.map((store: IStoreInterface) => (
              <Store key={store.id} style={{ marginBottom: "20px" }}>
                <Link
                  to={{
                    pathname: `/${store.id}`,
                    state: { name: store.name },
                  }}
                >
                  {store.name} &rarr;
                </Link>
              </Store>
            )),
          )}
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </button>
        </StoresList>
      )}
    </Container>
  );
}

export default Stores;
