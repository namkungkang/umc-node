import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStore } from "./controllers/store.controller.js";
import { handleReview } from "./controllers/review.controller.js";
import { handleMission } from "./controllers/mission.controller.js";
import { handleChallengeMemberMission } from "./controllers/attempt.controller.js"; // 미션 도전 핸들러 추가
import {handleListStoreReviews} from "./controllers/store.controller.js"
import {handleListMissions} from "./controllers/mission.controller.js";
import {handleListInprogress} from "./controllers/attempt.controller.js";
import {handleListComplete} from "./controllers/attempt.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/api/v1/stores", handleStore);

app.post("/api/v1/stores/review", handleReview);

app.post("/api/v1/stores/mission", handleMission);

app.post("/api/v1/missions/challenge", handleChallengeMemberMission); 

//ORM
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.get("/api/v1/stores/:storeId/missions", handleListMissions);

app.get("/api/v1/missions/inprogress", handleListInprogress);

app.put("/api/v1/missions/:missionId/complete", handleListComplete);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
