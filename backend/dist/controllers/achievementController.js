import Achievement from "../models/achievmentModel";
export const getAchievements = async (req, res) => {
    try {
        const userId = req.user._id;
        const achievements = await Achievement.find({ userId });
        res.status(200).json(achievements);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching achievements", error });
    }
};
export const updateAchievement = async (req, res) => {
    try {
        const { achievementId } = req.params;
        const { progress } = req.body;
        const achievement = await Achievement.findById(achievementId);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }
        // Update progress
        achievement.progress = progress;
        if (progress >= 100) {
            achievement.isCompleted = true; // Mark as completed if progress is 100%
        }
        await achievement.save();
        res.status(200).json({ message: "Achievement updated successfully", achievement });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating achievement", error });
    }
};
export const incrementAchievement = async (userId, achievementName, incrementBy) => {
    const achievement = await Achievement.findOne({ userId, name: achievementName });
    if (!achievement) {
        console.error(`Achievement '${achievementName}' not found for user.`);
        return;
    }
    achievement.progress += incrementBy;
    if (achievement.progress >= 100) {
        achievement.isCompleted = true; // Mark as completed
    }
    await achievement.save();
};
