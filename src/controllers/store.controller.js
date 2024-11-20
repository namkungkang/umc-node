import { StatusCodes } from 'http-status-codes';
import { createStore } from '../services/store.service.js';
import { listStoreReviews } from '../services/store.service.js';
import { DuplicateStoreError } from '../errors.js';

export const handleStore = async (req, res) => {
  try {
    const storeData = {
      regionId: req.body.regionId,
      name: req.body.name,
      address: req.body.address,
      score:req.body.score
    };
    /*
      #swagger.summary = '가게 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                regionId: { type: "number" },
                name: { type: "string" },
                address: { type: "string" },
                score: { type: "string", format: "float" },
                
                }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "가게 추가 성공 응답",
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
                    id: { type: "string" },
                    regionId: { type: "string" },
                    name: { type: "string"}, 
                    address : {type : "string"},
                    score : {type : "number" ,format : "float"}
                    
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "가게 추가 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "400_STORE_1" },
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
    
    const storeId = await createStore(storeData); 
    res.status(StatusCodes.CREATED).json({ id: storeId }); 
  } catch (error) {
    if (error instanceof DuplicateStoreError) {
      return res.status(StatusCodes.CONFLICT).json({
        resultType: "FAIL",
        error: {
          errorCode: error.errorCode,
          reason : error.reason,
          data: error.data,

        },
        success:null
      })
    }  
  
  }
};


export const handleListStoreReviews = async (req, res) => {
  const storeId = parseInt(req.params.storeId); 
  const cursor = req.query.cursor || 0;  

  
  if (isNaN(storeId)) {
    return res.status(400).json({
      success: false,
      message: 'storeId 존재하지않음',
    });
  }
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
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
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
    const reviews = await listStoreReviews(storeId, cursor);

    
    res.status(200).json({
      success: true,
      data: reviews,
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

