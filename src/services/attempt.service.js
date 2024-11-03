// services/memberMission.service.js
import { addMemberMission, checkMemberMissionExists } from '../repositories/attempt.repository.js';

export const challengeMemberMission = async (missionData) => {
    // 미션에 대한 도전 중인지 확인
    const attemptExists = await checkMemberMissionExists(missionData.member_id, missionData.mission_id);
    if (attemptExists) {
        throw new Error('You have already challenged this mission.');
    }

    const attemptId = await addMemberMission(missionData);
    return attemptId;
};
