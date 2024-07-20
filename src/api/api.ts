import axios from "axios";
import { IPageParam, StoreRouteParams, ILikeProps } from "../types/store";

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
    console.error("Failed to fetch likes", error);
    throw new Error("Failed to fetch likes");
  }
}

// 좋아요 클릭 POST API
export async function postLikeStatus(bbsSeq: number) {
  try {
    await axios.post(`${BASE_URL}/api/toy/like`, {
      bbsSeq,
    });
  } catch (error) {
    console.error("Failed to post like status", error);
    throw new Error("Failed to post like status");
  }
}

// 좋아요 취소 PUT API
export async function deleteLikeStatus(bbsSeq: number) {
  try {
    // 쿼리 파라미터를 URL에 포함하여 삭제 요청
    const response = await axios.put(`${BASE_URL}/api/toy/like/cancel`, {
      data: {
        bbsSeq,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete like status", error);
    throw new Error("Failed to delete like status");
  }
}
