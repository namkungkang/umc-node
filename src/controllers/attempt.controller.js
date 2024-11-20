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
    /*
      #swagger.summary = '미션 도중 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                memberId: { type: "number" },
                missionId: { type: "number" },
              
                }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "미션 도중 추가 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                  id: { type: "number" },
                  memberId: { type: "number" },
                  missionId: { type: "number" },
                  status : {type:"string"},
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "미션 도중 추가 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "400_ATTEMPT_1" },
                    reason: { type: "string" },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */

    const attemptId = await challengeMemberMission(missionData);
    res.status(201).json({ id: attemptId });
  } catch (error) {
    if (error instanceof DuplicateAttemptError) {
      return res.status(StatusCodes.CONFLICT).json({
        resultType: "FAIL",
        error: {
          errorCode: error.errorCode,
          reason: error.reason,
        },
        success: null,
      });
    }
  }
};

export const handleListInprogress = async (req, res) => {
  try {
    const { memberId } = req.query;
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        memberId : {type : "number"},
                        missionId : {type : "number"},
                        status : {type : "string"}
                        }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
    if (!memberId) {
      return res.status(400).json({ message: "memberID 없음." });
    }

    const inProgressMissions = await getMemberInProgressMissions(memberId);

    if (inProgressMissions.length === 0) {
      return res.status(404).json({ message: "진행중인 미션없음." });
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
    /*
    #swagger.summary = '진행중인 미션 완료로 바꾸기 API';
    #swagger.responses[200] = {
      description: "진행중인 미션 완료로 바꾸기",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        memberId : {type : "number"},
                        missionId : {type : "number"},
                        status : {type : "string"}
                       }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
    console.log("memberId:", memberId);
    console.log("missionId:", missionId);

    if (!memberId || !missionId) {
      return res.status(400).json({ message: "MemberId Mission Id 필요함." });
    }

    const updatedMission = await getMemberCompleteMissions(
      memberId,
      parseInt(missionId)
    );

    return res.status(200).json({ message: "미션 성공.", updatedMission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버에러" });
  }
};
