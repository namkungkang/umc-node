import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser, 
  getUserByEmail, 
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../errors.js";

// 회원 가입 함수
export const userSignUp = async (data) => {
  // 이메일로 기존 사용자 조회
  const existingUser = await getUserByEmail(data.email);

  // 이미 존재하는 이메일이면 회원가입 불가
  if (existingUser) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  // 새로운 사용자 추가
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phone_num: data.phone_num,
  });

  // 선호 카테고리 설정
  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  // 새로 가입된 사용자 정보 및 선호 카테고리 반환
  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

// 회원 정보 업데이트 함수
export const userUpdate = async (data) => {
  // 이메일로 기존 사용자 조회
  const existingUser = await getUserByEmail(data.email);

  if (!existingUser) {
    throw new Error("사용자를 찾을 수 없습니다."); // 사용자가 없다면 에러 발생
  }

  // 이메일 변경 시, 이메일이 다른 사용자에게 이미 사용되고 있는지 확인
  if (existingUser.email !== data.email) {
    const emailExists = await getUserByEmail(data.email);
    if (emailExists) {
      throw new Error("이메일이 이미 존재합니다. 다른 이메일을 사용해 주세요.");
    }
  }

  // 사용자 정보 업데이트
  const updatedUser = await updateUser(data); // 사용자 정보 갱신

  // 선호 카테고리 갱신 로직
  if (data.preferences && Array.isArray(data.preferences) && data.preferences.length > 0) {
    // 기존 선호 카테고리 삭제 및 새로운 선호 카테고리 추가
    await setPreference(updatedUser.id, data.preferences); // 선호 카테고리 갱신
  }

  // 갱신된 사용자 정보와 선호 카테고리 가져오기
  const preferences = await getUserPreferencesByUserId(updatedUser.id);

  // 갱신된 정보 반환
  return responseFromUser({ user: updatedUser, preferences });
};
