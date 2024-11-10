// services/review.service.js
import { addReview } from '../repositories/review.repository.js';
import { checkStoreExists } from '../repositories/store.repository.js';
import { pool } from '../db.config.js'; // pool 임포트 추가

// 리뷰 생성 함수
export const createReview = async (reviewData) => {
  // store_id가 존재하는지 확인
  const storeExists = await checkStoreExistsById(reviewData.storeId);
  if (!storeExists) {
    throw new Error('식당 존재하지않음');
  }

  const reviewId = await addReview(reviewData);
  return reviewId;
};

// 가게 존재 확인 함수
export const checkStoreExistsById = async (storeId) => {
  const [rows] = await pool.query(
    `SELECT id FROM umc.store WHERE id = ?`, 
    [storeId]
  );
  return rows.length > 0; 
};
