export const bodyToReview = (body) => {
    return {
      store_id:body.store_id,
      body:body.body,
      score:body.score
    };
  };
