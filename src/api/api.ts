import axios from "axios";
import { IPageParam, StoreRouteParams } from "../types/store";

const BASE_URL = `https://api.ssgpms.com`;

// 아이템 리스트 목록: 여러 개의 아이템(객체)을 페이지 단위로 가져옴
export async function fetchStores({ pageParam }: IPageParam) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/toy/bbs?currentPage=${pageParam}&employeeSeq=1`,
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
      `${BASE_URL}/api/toy/bbs/detail?bbsSeq=${storeId}&employeeSeq=1`,
    );
    return response.data;
  } catch (error) {
    console.error("에러메시지:", error);
    throw new Error("api호출 실패!");
  }
}

//좋아요 등록,취소 post api
export async function postLikeStatus(
  bbsSeq: number,
  employeeSeq: number,
  likeYn: boolean,
) {
  const response = await axios.post(`${BASE_URL}/api/toy/like`, {
    bbsSeq,
    employeeSeq,
    likeYn,
  });
  return response.data;
}
