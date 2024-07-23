import { useEffect } from "react";

const useInfiniteScroll = (
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
) => {
  useEffect(() => {
    console.log(
      `onEndScroll
          브라우저 height(${window.innerHeight}), 현재 스크롤바의 위치(${window.scrollY}), 현재 페이지(${document.body.offsetHeight})`,
    );
    const handleScroll = () => {
      if (
        ///window.innerHeight(브라우저 위의 탭+북마크+주소창을 제외한 브라우저 height) + window scrollY(현재 스크롤바의 위치)한 값이 document height(전체 웹 height)보다 클 경우
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup 함수
    return () => {
      // Scroll 이벤트 리스너 제거(계속중복되어서 패칭되어서 추가)
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};

export default useInfiniteScroll;
