// controllers/review.controller.js
import { StatusCodes } from 'http-status-codes';
import { createReview } from '../services/review.service.js';

// 리뷰 추가 핸들러
export const handleReview = async (req, res) => {
  try {
    const reviewData = {
      member_id: req.body.member_id, // 사용자의 ID
      store_id: req.body.store_id,     // 가게의 ID
      body: req.body.body,              // 리뷰 내용
      score: req.body.score              // 리뷰 점수
    };

    const reviewId = await createReview(reviewData); // 리뷰 추가 서비스 호출
    res.status(StatusCodes.CREATED).json({ id: reviewId }); // 생성된 리뷰 ID 반환
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }); // 에러 발생 시 메시지 반환
  }
};
