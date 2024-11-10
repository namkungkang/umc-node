import {prisma} from "../db.config.js";

// 미션 도전 기록 추가
export const addMemberMission = async (missionData) => {
    const { memberId, missionId} = missionData;
    const memberMission = await prisma.memberMission.create({
        data:{
            memberId : memberId,
            missionId : missionId,
            status : 'pending',
            createdAt : new Date(),
            updatedAt : new Date(),
        },
    });
    return memberMission.id; // 새로 생성된 도전 기록의 ID를 반환
};

// 미션 도전 여부 확인
export const checkMemberMissionExists = async (memberId, missionId) => {
    const memberMission = await prisma.memberMission.findFirst({
        where: {
            memberId: memberId,
            missionId : missionId,
            status : 'pending'
        }
    })
    return memberMission ? true:false; // 도전 중인 기록이 있으면 true 반환
};
