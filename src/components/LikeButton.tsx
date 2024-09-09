import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { postLikeStatus } from "../api/api";
import { LikesButton } from "../style/StoreStyle";
import { IStoreInterface } from "../types/store";
import useLikeButtonRefetchStore from "../stores/likeButtonRefetchStore";

interface LikeButtonProps {
  store: IStoreInterface;
  refetch: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ store, refetch }) => {
  const { setRefetchYn } = useLikeButtonRefetchStore();

  const handleLikeToggle = async () => {
    // 좋아요 상태 업데이트
    await postLikeStatus({
      bbsSeq: store.bbsSeq,
      employeeSeq: 1,
    });
    //좋아요 버튼 클릭을 전역으로 관찰
    setRefetchYn(true);
    refetch();
  };

  return (
    <LikesButton onClick={handleLikeToggle}>
      <FontAwesomeIcon icon={store.likeYn === "Y" ? faHeart : faHeartBroken} />
    </LikesButton>
  );
};

export default LikeButton;
