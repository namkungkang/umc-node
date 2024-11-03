// controllers/mission.controller.js
import { createMission } from '../services/mission.service.js';

export const handleMission = async (req, res) => {
    try {
        const missionData = {
            store_id: req.body.store_id,
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
