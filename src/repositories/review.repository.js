import {prisma} from "../db.config.js";


export const addReview = async (reviewData) => {
    const { memberId, storeId, body, score } = reviewData;
    const review = await prisma.review.create({
        data: {
            memberId : memberId,
            storeId : storeId,
            body:body,
            score:score,
            createdAt : new Date(),
        },
    });
    return review.id; 
  };

export const getReviewsByStoreId = async (storeId) => {
  const reviews = await prisma.review.findMany({
    where: {
        storeId : storeId,
    },
    orderBy: {
        createdAt:"desc",
    },
  })
  return reviews; 
};
