// controllers/review.controller.js
import { StatusCodes } from 'http-status-codes';
import { createReview } from '../services/review.service.js';
import { DuplicateReviewError } from '../errors.js';
// 리뷰 추가 핸들러
export const handleReview = async (req, res) => {
  try {
    const reviewData = {
      memberId: req.body.memberId, // 사용자의 ID
      storeId: req.body.storeId,     // 가게의 ID
      body: req.body.body,              // 리뷰 내용
      score: req.body.score              // 리뷰 점수
    };

    const reviewId = await createReview(reviewData); // 리뷰 추가 서비스 호출
    res.status(StatusCodes.CREATED).json({ id: reviewId }); // 생성된 리뷰 ID 반환
  } catch (error) {
    if (error instanceof DuplicateReviewError) {
      return res.status(StatusCodes.CONFLICT).json({
        resultType: "FAIL",
        error: {
          errorCode: error.errorCode,
          reason : error.reason,
          
        },
        success:null
      })
    }  
  
  }
};