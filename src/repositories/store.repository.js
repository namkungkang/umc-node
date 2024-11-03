import { pool } from "../db.config.js";

export const addStore = async (storeData) => {
  // region_id가 존재하지 않으면 쿼리에서 생략
  const query = `
    INSERT INTO umc.store (name, address${storeData.region_id ? ', region_id' : ''}) 
    VALUES (?, ?${storeData.region_id ? ', ?' : ''})
  `;
  
  const params = [storeData.name, storeData.address];
  
  if (storeData.region_id) {
    params.push(storeData.region_id);
  }

  const [result] = await pool.query(query, params);
  return result.insertId; 
};

export const checkStoreExists = async (name, region_id) => {
  const [rows] = await pool.query(
    `SELECT id FROM umc.store WHERE name = ? AND region_id = ?`, 
    [name, region_id]
  );
  return rows.length > 0; 
};  
