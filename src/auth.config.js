import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((member) => cb(null, member))
      .catch((err) => cb(err));
  }
);

export const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const member = await prisma.member.findFirst({ where: { email } });
  if (member !== null) {
    return { id: member.id, email: member.email, name: member.name };
  }

  const created = await prisma.member.create({
    data: {
      email: "namkung01s1@skuniv.ac.kr",
      name: "남궁강",
      gender: "남성",
      birth: new Date(1970, 0, 1),
      address: "경기도",
      detailAddress: "남양주",
      phone_num: "010-4132-7506",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
    //kakao는 기본적인 이메일과 프로필 정보를 제공해서 scope 필요없음
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return kakaoVerify(profile)
      .then((member) => cb(null, member))
      .catch((err) => cb(err));
  }
);

export const kakaoVerify = async (profile) => {
  const email = profile._json.kakao_account?.email;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const member = await prisma.member.findFirst({ where: { email } });
  if (member !== null) {
    return { id: member.id, email: member.email, name: member.name };
  }

  const created = await prisma.member.create({
    data: {
      email: email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phone_num: "추후 수정",
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};
