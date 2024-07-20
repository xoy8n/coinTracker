import React, { useState } from "react";
import { fetchLikes, postLikeStatus, deleteLikeStatus } from "../api/api";
import { LikesButton } from "../style/StoreStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
interface LikeButtonProps {
  storeId: number; // storeId가 컴포넌트의 props로 전달됨
}

const LikeButton: React.FC<LikeButtonProps> = ({ storeId }) => {
  const [liked, setLiked] = useState<boolean>(false); // 좋아요 상태

  const handleLikeToggle = async () => {
    try {
      if (!liked) {
        await postLikeStatus(storeId);
      } else {
        // 좋아요 상태가 false이면 좋아요 추가 요청
        await deleteLikeStatus(storeId);
      }
      setLiked(!liked); // 버튼 클릭 후 상태 토글
      await fetchLikes(storeId);
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
