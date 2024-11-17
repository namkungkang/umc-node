import { challengeMemberMission } from "../services/attempt.service.js";
import { getMemberInProgressMissions } from "../services/attempt.service.js";
import { getMemberCompleteMissions } from "../services/attempt.service.js";
import { DuplicateAttemptError } from "../errors.js";
import { StatusCodes } from "http-status-codes";

export const handleChallengeMemberMission = async (req, res) => {
  try {
    const missionData = {
      memberId: req.body.memberId,
      missionId: req.body.missionId,
    };

    const attemptId = await challengeMemberMission(missionData);
    res.status(201).json({ id: attemptId });
  } catch (error) {
    if (error instanceof DuplicateAttemptError) {
      return res.status(StatusCodes.CONFLICT).json({
        resultType: "FAIL",
        error: {
          errorCode: error.errorCode,
          reason : error.reason,
          
        },
        success:null
      });
    }}}

export const handleListInprogress = async (req, res) => {
  try {
    const { memberId } = req.query;

    if (!memberId) {
      return res.status(400).json({ message: "memberID 없음." });
    }

    const inProgressMissions = await getMemberInProgressMissions(memberId);

    if (inProgressMissions.length === 0) {
      return res
        .status(404)
        .json({ message: "진행중인 미션없음." });
    }

    return res.status(200).json({ inProgressMissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버에러" });
  }
};
export const handleListComplete = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { memberId } = req.body;

    console.log("memberId:", memberId);
    console.log("missionId:", missionId);

    if (!memberId || !missionId) {
      return res
        .status(400)
        .json({ message: "MemberId Mission Id 필요함." });
    }

    const updatedMission = await getMemberCompleteMissions(
      memberId,
      parseInt(missionId)
    );

    return res
      .status(200)
      .json({ message: "미션 성공.", updatedMission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버에러" });
  }
};
