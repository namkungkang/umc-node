import { pool } from "../db.config.js";

// 리뷰 추가
export const addReview = async (reviewData) => {
    const { member_id, store_id, body, score } = reviewData;
    const [result] = await pool.query(
      `INSERT INTO umc.review (member_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [member_id, store_id, body, score]
    );
    return result.insertId; // 새로 생성된 리뷰의 ID를 반환
  };

// 특정 가게의 리뷰 조회 (선택 사항)
export const getReviewsByStoreId = async (store_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM umc.review WHERE store_id = ? ORDER BY created_at DESC`,
    [store_id]
  );
  return rows; // 가게의 모든 리뷰를 반환
};
