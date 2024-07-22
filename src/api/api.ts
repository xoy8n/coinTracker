import axios from "axios";
import { IPageParam, StoreRouteParams } from "../types/store";

const BASE_URL = `https://api.ssgpms.com`;

// 아이템 리스트 목록: 여러 개의 아이템(객체)을 페이지 단위로 가져옴
export async function fetchStores({ pageParam }: IPageParam) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/toy/bbs?currentPage=${pageParam}`,
    );
    return response.data;
  } catch (error) {
    console.error("에러메시지:", error);
    throw new Error("api호출 실패!");
  }
}

//세부아이템 : 단일 아이템(객체)의 상세정보를 가져옴
export async function fetchDetailStore({ storeId }: StoreRouteParams) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/toy/bbs/detail?bbsSeq=${storeId}`,
    );
    return response.data;
  } catch (error) {
    console.error("에러메시지:", error);
    throw new Error("api호출 실패!");
  }
}

// 좋아요 목록을 가져오는 API
export async function fetchLikes(bbsSeq: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/toy/likes`, {
      params: { bbsSeq },
    });
    return response.data;
  } catch (error) {
    console.error("에러메시지:", error);
    throw new Error("api호출 실패!");
  }
}

// 좋아요 클릭 POST API
export async function postLikeStatus(bbsSeq: number, likeSeq: number) {
  try {
    console.log(`Post : bbsSeq: ${bbsSeq}, likeSeq: ${likeSeq}`);
    await axios.post(`${BASE_URL}/api/toy/like`, {
      bbsSeq,
      likeSeq,
    });
  } catch (error) {
    console.error("에러메시지:", error);
    throw new Error("POST요청 실패!");
  }
}

// 좋아요 취소 PUT API
export async function deleteLikeStatus(bbsSeq: number, likeSeq: number) {
  console.log(`Put : bbsSeq: ${bbsSeq}, likeSeq: ${likeSeq}`);
  try {
    const response = await axios.put(`${BASE_URL}/api/toy/like/cancel`, {
      bbsSeq,
      likeSeq,
    });
    return response.data;
  } catch (error) {
    console.error("에러메시지", error);
    throw new Error("PUT요청 실패");
  }
}
