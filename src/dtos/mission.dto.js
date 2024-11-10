export const bodyToMisson = (body) => {
    return {
      storeId:body.storeId,
      reward:body.reward,
      deadline:body.deadline,
      mission_spec:body.mission_spec
    };
  };