import cron from "node-cron";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import { sendReminderEmail } from "../utils/emailSender.js";

// ⏰ This runs every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking for events...");

  try {
    const now = new Date();
    const events = await Event.find({
      reminderTime: { $lte: now },
      sendEmail: true,
      reminderSent: false,
    });

    for (const event of events) {
      const user = await User.findById(event.user);
      if (user && user.email) {
        const subject = `Reminder: ${event.title}`;
        const message = event.description || "Reminder!";

        await sendReminderEmail(user.email, subject, message);

        event.reminderSent = true;
        await event.save();
      }
    }
  } catch (err) {
    console.error("Error in scheduler:", err.message);
  }
});
