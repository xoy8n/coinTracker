import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CoinsList = styled.ul``

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover{
        a{
            color: ${props => props.theme.accentColor};
        }
    }
`

const Title = styled.h1`
    font-size: 50px;
    font-weight: bold;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    display: block;
    text-align: center;
`

const CoinImg = styled.img`
    width: 35px;
    height: 35px;
`

interface CoinInterface{
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new: boolean,
    is_active: boolean,
    type : string
}


function Coins(){
    const [coins, setCoins] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async()=>{
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // }, [])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://api.coinpaprika.com/v1/coins");
                setCoins(response.data.slice(0, 100));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>코인가게</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                           <Link to={{
                                pathname : `/${coin.id}`,
                                state: {name: coin.name},
                            }}>
                                <CoinImg src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;