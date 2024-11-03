// controllers/memberMission.controller.js
import { challengeMemberMission } from '../services/attempt.service.js';

export const handleChallengeMemberMission = async (req, res) => {
    try {
        const missionData = {
            member_id: req.body.member_id,
            mission_id: req.body.mission_id,
        };

        const attemptId = await challengeMemberMission(missionData);
        res.status(201).json({ id: attemptId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
