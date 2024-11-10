import { createMission } from "../services/mission.service.js";
import { getMissionsByStoreId } from "../services/mission.service.js";

export const handleMission = async (req, res) => {
  try {
    const missionData = {
      storeId: req.body.storeId,
      reward: req.body.reward,
      deadline: req.body.deadline,
      mission_spec: req.body.mission_spec,
    };

    const missionId = await createMission(missionData);
    res.status(201).json({ id: missionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const handleListMissions = async (req, res) => {
  try {
    const { storeId } = req.params;

    const missions = await getMissionsByStoreId(storeId);

    if (missions.length === 0) {
      return res
        .status(404)
        .json({ message: "미션 존재하지않음" });
    }


    return res.status(200).json({ missions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버에러" });
  }
};
