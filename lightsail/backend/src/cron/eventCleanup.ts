import cron from "node-cron";
import Event from "../models/eventModel";

// Schedule the cleanup job to run every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    const result = await Event.deleteMany({ date: { $lt: currentDate } });
    if (result.deletedCount) {
      console.log(`Deleted ${result.deletedCount} past events.`);
    }
  } catch (error) {
    console.error("Error during event cleanup:", error);
  }
});
