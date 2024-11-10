export const bodyToMissonAttempt = (body) => {
    return {
      memberId:body.memberId,
      missonId:body.missonId
    };
  };