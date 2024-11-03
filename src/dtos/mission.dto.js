export const bodyToMisson = (body) => {
    return {
      store_id:body.store_id,
      reward:body.reward,
      deadline:body.deadline,
      misson_spec:body.misson_spec
    };
  };