import React from "react";
import { postLikeStatus, deleteLikeStatus } from "../api/api";
import { LikesButton } from "../style/StoreStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useLikeStore } from "../store/likeStore";

interface LikeButtonProps {
  storeId: number; // storeId가 컴포넌트의 props로 전달됨
}

const LikeButton: React.FC<LikeButtonProps> = ({ storeId }) => {
  const { likedStores, toggleLike } = useLikeStore();
  const liked = likedStores[storeId] || false;

  const handleLikeToggle = async () => {
    try {
      if (!liked) {
        await postLikeStatus(storeId);
      } else {
        await deleteLikeStatus(storeId);
      }
      toggleLike(storeId); // 상태를 토글
    } catch (error) {
      console.error("상태변경 불가 에러 :", error);
    }
  };

  return (
    <LikesButton onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={liked ? faHeart : faHeartBroken} />
    </LikesButton>
  );
};

export default LikeButton;
