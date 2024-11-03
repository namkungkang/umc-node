// services/mission.service.js
import { addMission } from '../repositories/mission.repository.js';
import { checkStoreExistsById } from '../repositories/store.repository.js'; // ID로 가게 확인 함수 임포트

export const createMission = async (missionData) => {
    // store_id가 존재하는지 확인
    const storeExists = await checkStoreExistsById(missionData.store_id);
    if (!storeExists) {
        throw new Error('Store does not exist');
    }

    const missionId = await addMission(missionData);
    return missionId;
};
