import { prisma } from "../db.config.js";

export const addStoreReview = async (reviewData) => {
  const { member_id, store_id, body, score } = reviewData;
  const review = await prisma.review.create({
    data: {
      member_id: member_id,
      store_id: store_id,
      body: body,
      score: score,
    },
  });

  return review.id;
};

export const addStore = async (storeData) => {
    const { regionId, name, address, score } = storeData;
  
    const region = await prisma.region.findUnique({
      where: { id: regionId }
    });
  
    if (!region) {
      region = await prisma.region.create({
        data: {
          name: "새로운 지역",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  
    const store = await prisma.store.create({
      data: {
        regionId: region.id,  
        name: name,
        address: address,
        score: parseFloat(score), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  
    return store.id;
  };
  

export const checkStoreExists = async (name, regionId) => {
  const store = await prisma.store.findFirst({
    where: {
      name: name,
      regionId: regionId,
    },
  });
  return store !== null;
};

export const checkStoreExistsById = async (storeId) => {
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return store !== null;
};
