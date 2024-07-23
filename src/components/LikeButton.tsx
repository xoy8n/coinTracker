import React from "react";
import {
  postLikeStatus,
  deleteLikeStatus,
  fetchLikes,
  fetchDetailStore,
} from "../api/api";
import { LikesButton } from "../style/StoreStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useLikeStore } from "../store/likeStore";

interface LikeButtonProps {
  storeId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ storeId }) => {
  const { likedStores, toggleLike } = useLikeStore();
  const liked = likedStores[storeId];

  const handleLikeToggle = async () => {
    try {
      if (!liked) {
        await postLikeStatus(storeId, 1);
        await fetchLikes(storeId);
      } else {
        await deleteLikeStatus(storeId, 0);
        await fetchLikes(storeId);
      }
      toggleLike(storeId);
      console.log(likedStores);
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
