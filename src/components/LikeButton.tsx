import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { postLikeStatus } from "../api/api";
import { LikesButton } from "../style/StoreStyle";
import { IStoreInterface } from "../types/store";

interface LikeButtonProps {
  store: IStoreInterface;
  refetch: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ store, refetch }) => {
  const isLiked = store.likeYn === "Y";

  const handleLikeToggle = async () => {
    try {
      // 좋아요 상태 업데이트
      await postLikeStatus({
        bbsSeq: store.bbsSeq,
        employeeSeq: 1,
        likeYn: !isLiked,
      });
      // refetch 함수 호출
      refetch();
    } catch (error) {
      console.error("상태 변경 불가 에러:", error);
    }
  };

  return (
    <LikesButton onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={isLiked ? faHeart : faHeartBroken} />
    </LikesButton>
  );
};

export default LikeButton;
