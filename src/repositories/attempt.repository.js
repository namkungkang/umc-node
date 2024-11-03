// repositories/memberMission.repository.js
import { pool } from "../db.config.js";

// 미션 도전 기록 추가
export const addMemberMission = async (missionData) => {
    const { member_id, mission_id } = missionData;
    const [result] = await pool.query(
        `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) VALUES (?, ?, 'pending', NOW(), NOW())`,
        [member_id, mission_id]
    );
    return result.insertId; // 새로 생성된 도전 기록의 ID를 반환
};

// 미션 도전 여부 확인
export const checkMemberMissionExists = async (member_id, mission_id) => {
    const [rows] = await pool.query(
        `SELECT id FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = 'pending'`, 
        [member_id, mission_id]
    );
    return rows.length > 0; // 도전 중인 기록이 있으면 true 반환
};
