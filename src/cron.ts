import cron from "node-cron";
import { vaccineRemindersJob } from "./jobs/vaccineReminders.job";

export function initCron(): void {
  // Dev : run every minute = "*/1 * * * *"
  // Prod : run every day at 8am = "0 8 * * *"
  cron.schedule(
    "*/1 * * * *",
    async () => {
      try {
        await vaccineRemindersJob();
      } catch (err) {
        console.error("[CRON] vaccineRemindersJob failed", err);
      }
    },
    { timezone: "Europe/Paris" }
  );
}
