import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const member = await prisma.member.findFirst({
    where: { email: data.email },
  });
  if (member) {
    return null;
  }

  const created = await prisma.member.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: new Date(data.birth), 
      address: data.address,
      detailAddress: data.detailAddress || "",
      phone_num: data.phone_num, 
    },
  });

  return created.id; 
};
// 사용자 정보 얻기
export const getUser = async (memberId) => {
  const member = await prisma.member.findFirstOrThrow({
    where: { id: memberId },
  });
  return member;
};

export const updateUser = async (data) => {
  return await prisma.member.update({
    where: { email: data.email },
    data: {
      name: data.name,
      gender: data.gender,
      birth: new Date(data.birth), 
      address: data.address,
      detailAddress: data.detailAddress || "",
      phone_num: data.phone_num, 
    },
  });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, foodCategoryId) => {
  await prisma.memberPrefer.create({
    data: {
      memberId: memberId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId) => {
  const preferences = await prisma.memberFavorCategory.findMany({
    select: {
      id: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { memberId: memberId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.memberStoreReview.findMany({
    select: { id: true, content: true, store: true, member: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

// user.repository.js
export const getUserByEmail = async (email) => {
  return await prisma.member.findUnique({
    where: { email: email },
  });
};


//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
//       data.email
//     );

//     if (confirm[0].isExistEmail) {
//       return null;
//     }

//     const [result] = await pool.query(
//       `INSERT INTO member (email, name, gender,age, address, spec_address, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?);`,
//       [
//         data.email,
//         data.name,
//         data.gender,
//         data.age,
//         data.birth,
//         data.address,
//         data.detailAddress,
//         data.phoneNumber,
//       ]
//     );

//     return result.insertId;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// 사용자 정보 얻기
// export const getUser = async (userId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [user] = await pool.query(`SELECT * FROM member WHERE id = ?;`, userId);

//     console.log(user);

//     if (user.length == 0) {
//       return null;
//     }

//     return user;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// // 음식 선호 카테고리 매핑
// export const setPreference = async (userId, foodCategoryId) => {
//   const conn = await pool.getConnection();

//   try {
//     await pool.query(
//       `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
//       [foodCategoryId, userId]
//     );

//     return;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

// // 사용자 선호 카테고리 반환
// export const getUserPreferencesByUserId = async (userId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [preferences] = await pool.query(
//       "SELECT ufc.id, ufc.food_category_id, ufc.member_id, fcl.name " +
//         "FROM member_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
//         "WHERE ufc.member_id = ? ORDER BY ufc.food_category_id ASC;",
//       userId
//     );

//     return preferences;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };
