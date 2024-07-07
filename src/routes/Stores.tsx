import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { IStoreInterface } from "../types/store";
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



const Stores : FC<IStoreInterface> = ({ innerRef, id, name, ...props}) => {

    const {ref, inView} = useInView({

    })
    const [stores, setStores] = useState<IStoreInterface[]>([]);
    const fetchStores = async ({pageParam} : {pageParam : number}) => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${pageParam}/comments`,
        );
        return response.data;
    };

    const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['stores'],
        queryFn : fetchStores,
        initialPageParam: 1,
        getNextPageParam : (lastPage, allPages) => {
            console.log({lastPage, allPages});
            const nextPage = lastPage.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
        maxPages :5
    })

    const content = data?.pages.map((stores: IStoreInterface[]) => stores.map(store => {
        return (
            <Store ref={innerRef}  key={store.id} style={{ marginBottom: "20px" }}>
                <Link
                    to={{
                         pathname: `/${store.id}`,
                        state: { name: store.name},
                    }}
                    innerRef={ref}
                >
                    {store.name} &rarr;
                </Link>
            </Store>
        )
    }));

    useEffect(() => {
        if(inView && hasNextPage){
            console.log("갱신갱신갱신")
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if(status === 'pending'){
        return <Loader>loading...</Loader>
    }

    if(status === 'error'){
        return <p>Error : {error.message} </p>
    }

  return (
      <Container>
        <Header>
          <Title>🥃술집목록🍺</Title>
        </Header>
            <StoresList>
                {content}
                {/*<button ref={ref} disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? "불러오는중..." : hasNextPage ?  "더 보기" : "끝"}</button>*/}
                {isFetchingNextPage && <h3>Loading~~</h3>}
            </StoresList>
      </Container>
  );
}

export default Stores;