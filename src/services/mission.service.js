// services/mission.service.js
import { addMission } from '../repositories/mission.repository.js';
import { checkStoreExistsById } from '../repositories/store.repository.js'; // ID로 가게 확인 함수 임포트
import {prisma} from '../db.config.js';
import { DuplicateMissionError } from '../errors.js';

export const createMission = async (missionData) => {
    const storeExists = await checkStoreExistsById(missionData.storeId);
    if (storeExists) {
      throw new DuplicateMissionError("미션 이미 존재함",{
        storeId : missionData.storeId,
      })}
  
    const missionId = await addMission(missionData);
    return missionId;
};

export const getMissionsByStoreId = async (storeId) => {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: parseInt(storeId), 
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
    return missions; 
  };