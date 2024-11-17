import {
  addStore,
  checkStoreExists,
} from "../repositories/store.repository.js";
import { prisma } from "../db.config.js";
import { DuplicateStoreError } from "../errors.js";

export const createStore = async (storeData) => {
  const storeExists = await checkStoreExists(
    storeData.name,
    storeData.regionId
  );
  if (storeExists) {
    throw new DuplicateStoreError("지역에 이미 존재함",{
      name:storeData.name,
      regionId : storeData.regionId,
    });
  }

  const storeId = await addStore(storeData);
  return storeId;
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
        id: true,
        body: true,
        storeId: true,
        memberId: true,
        member: true,  
        store: true,   
        reviewImages: true,  
      },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

const responseFromReviews = (reviews) => {
  return reviews.map((review) => ({
    id: review.id,
    body: review.body,
    storeId: review.storeId,
    memberId: review.memberId,
    member: {
      id: review.member.id,
      email: review.member.email,
      name: review.member.name,
      gender: review.member.gender,
      birth: review.member.birth,
      address: review.member.address,
      detailAddress: review.member.detailAddress,
      phonenum: review.member.phonenum,
    },
    store: {
      id: review.store.id,
      name: review.store.name,
    },
  }));
};
