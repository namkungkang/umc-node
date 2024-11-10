// repositories/mission.repository.js
import {prisma} from "../db.config.js";


export const addMission = async (missionData) => {
    const { storeId, reward, deadline, mission_spec } = missionData;
   
    const mission = await prisma.mission.create({
        data : {
            storeId : storeId,
            reward:reward,
            deadline:new Date(deadline),
            missionSpec : mission_spec,
            createdAt : new Date(),
            updatedAt : new Date(),
        }
    })
    return mission.id; 
};
