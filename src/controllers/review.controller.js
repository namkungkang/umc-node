// controllers/review.controller.js
import { StatusCodes } from 'http-status-codes';
import { createReview } from '../services/review.service.js';
import { DuplicateReviewError } from '../errors.js';
// 리뷰 추가 핸들러
export const handleReview = async (req, res) => {
  try {
    const reviewData = {
      memberId: req.body.memberId, // 사용자의 ID
      storeId: req.body.storeId,     // 가게의 ID
      body: req.body.body,              // 리뷰 내용
      score: req.body.score              // 리뷰 점수
    }
     /*
      #swagger.summary = '리뷰 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                memberId: { type: "number" },
                storeId: { type: "number" },
                body: { type: "string" },
                score: { type: "number", format: "float" },
                
                }
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "리뷰 추가 성공 응답",
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
                    storeId: { type: "number"}, 
                    body : {type : "string"},
                    score : {type : "number" , format : "float"}
                    
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "리뷰 추가 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "400_REVIEW_1" },
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
    ;

    const reviewId = await createReview(reviewData); // 리뷰 추가 서비스 호출
    res.status(StatusCodes.CREATED).json({ id: reviewId }); // 생성된 리뷰 ID 반환
  } catch (error) {
    if (error instanceof DuplicateReviewError) {
      return res.status(StatusCodes.CONFLICT).json({
        resultType: "FAIL",
        error: {
          errorCode: error.errorCode,
          reason : error.reason,
          
        },
        success:null
      })
    }  
  
  }
};

