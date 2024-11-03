// repositories/store.repository.js
import { pool } from "../db.config.js";

export const addStoreReview = async (reviewData) => {
  const { member_id, store_id, body, score } = reviewData;
  const [result] = await pool.query(
    `INSERT INTO umc.review (member_id, store_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW())`,
    [member_id, store_id, body, score]
  );
  return result.insertId; // 새로 생성된 리뷰의 ID를 반환
};

// 기존의 store 관련 함수들
export const addStore = async (storeData) => {
  const [result] = await pool.query(
    `INSERT INTO umc.store (region_id, name, address) VALUES (?, ?, ?)`,
    [storeData.region_id, storeData.name, storeData.address]
  );
  return result.insertId; 
};

export const checkStoreExists = async (name, region_id) => {
  const [rows] = await pool.query(
    `SELECT id FROM umc.store WHERE name = ? AND region_id = ?`, 
    [name, region_id]
  );
  return rows.length > 0; 
};
