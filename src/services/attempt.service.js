import { addMemberMission, checkMemberMissionExists } from '../repositories/attempt.repository.js';
import {prisma} from '../db.config.js';
import { DuplicateAttemptError } from '../errors.js';


export const challengeMemberMission = async (missionData) => {
    const attemptExists = await checkMemberMissionExists(missionData.memberId, missionData.missionId);
    if (attemptExists) {
      throw new DuplicateAttemptError("이미 도전했던 미션임")

    }

    const attemptId = await addMemberMission(missionData);
    return attemptId;
};

export const getMemberInProgressMissions = async (memberId) => {
    const inProgressMissions = await prisma.memberMission.findMany({
      where: {
        memberId: parseInt(memberId), 
        status: {
          in: ['pending', 'in_progress'],         },
      },
      include: {
        mission: true, 
      },
    });
    return inProgressMissions; 
  };

  export const getMemberCompleteMissions = async (memberId, missionId) => {
    try {
      const memberMission = await prisma.memberMission.findFirst({
        where: {
          memberId: memberId,
          missionId: missionId,
          status: 'pending', 
        },
      });
  
      if (!memberMission) {
        throw new Error('미션을 찾지 못했거나 완료하였습니다');
      }
  
      const updatedMission = await prisma.memberMission.update({
        where: { id: memberMission.id },
        data: { status: 'completed', updatedAt: new Date() },
      });
  
      return updatedMission;
    } catch (error) {
      console.error('에러...:', error); 
      throw error; 
    }
  };
  
  