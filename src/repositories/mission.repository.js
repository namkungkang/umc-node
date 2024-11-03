// repositories/mission.repository.js
import { pool } from "../db.config.js";

// 미션 추가
export const addMission = async (missionData) => {
    const { store_id, reward, deadline, mission_spec } = missionData;
    const [result] = await pool.query(
        `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [store_id, reward, deadline, mission_spec]
    );
    return result.insertId; // 새로 생성된 미션의 ID를 반환
};
