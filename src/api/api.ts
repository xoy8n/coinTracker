import axios from "axios";
const BASE_URL = `https://jsonplaceholder.typicode.com`;

//아이템리스트목록 : 여러개의 아이템(객체)을 페이지단위로 가져옴
export async function fetchStores({ pageParam }: { pageParam: number }) {
  const response = await axios.get(`${BASE_URL}/posts?_page=${pageParam}`);
  return response.data;
}

//세부아이템 : 단일 아이템(객체)의 상세정보를 가져옴
export async function fetchDetailStore(storeId: string) {
  const response = await axios.get(`${BASE_URL}/posts/${storeId}`);
  return response.data;
}
