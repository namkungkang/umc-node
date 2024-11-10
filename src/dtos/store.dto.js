export const bodyToStore = (body) => {
    return {
      regionId:body.regionId,
      name:body.name,
      address:body.address,
      score:body.score
    };
  };

  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };