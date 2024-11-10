export const bodyToReview = (body) => {
    return {
        memberId:body.memberId,
      storeId:body.storeId,
      body:body.body,
      score:body.score
    };
  };
