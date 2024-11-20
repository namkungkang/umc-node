import { createMission } from "../services/mission.service.js";
import { getMissionsByStoreId } from "../services/mission.service.js";
import { DuplicateMissionError } from "../errors.js";
import { StatusCodes } from "http-status-codes";

export const handleMission = async (req, res) => {
  try {
    const missionData = {
      storeId: req.body.storeId,
      reward: req.body.reward,
      deadline: req.body.deadline,
      mission_spec: req.body.mission_spec,
    };
    /*
      #swagger.summary = '미션 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                storeId: { type: "number" },
                reward: { type: "number" },
                deadline: { type: "string" },
                missionSpec: { type: "string" },
                
                }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "미션 추가 성공 응답",
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
                  storeId: { type: "number" },
                  reward: { type: "number" },
                  deadline: { type: "string", format:"date" },
                   missionSpec: { type: "string" },
                
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "미션 추가 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "400_MISSON_1" },
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
    const missionId = await createMission(missionData);
    res.status(201).json({ id: missionId });
  } catch (error) {
    if (error instanceof DuplicateMissionError) {
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

export const handleListMissions = async (req, res) => {
  /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공 응답",
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
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        reward: {type:"number"},
                        deadline : {type:"string", format : "date"},
                        missionSpec : {type: "string"}
                        
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
 
  try {
    const { storeId } = req.params;

    const missions = await getMissionsByStoreId(storeId);

    if (missions.length === 0) {
      return res.status(404).json({ message: "미션 존재하지않음" });
    }

    return res.status(200).json({ missions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버에러" });
  }
};
