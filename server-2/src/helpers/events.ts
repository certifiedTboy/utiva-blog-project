import EventEmitter from "node:events";
import cron from "node-cron";
import EmailService from "./smtp.ts";
import { type IEventData } from "../lib/types.ts";

/**
 * @class AppEvents
 * @extends EventEmitter
 * @description A centralized event handling class for the application. It manages emitting and listening to custom events,
 * allowing for a decoupled architecture. For instance, when a new user is created, it emits a 'new-user' event,
 * which then triggers other processes like sending a welcome email.
 */
export class AppEvents extends EventEmitter {
  /**
   * @property {string[]} events - A list of all valid event names that can be emitted or listened to within the application.
   * This acts as an allowlist to prevent typos and ensure only defined events are used.
   */
  private readonly events: string[];
  /**
   * @property {Set<string>} activeJobs - A set to track emails for which a job (like sending a verification email) is currently
   * scheduled or running. This is used as a locking mechanism to prevent duplicate jobs for the same user,
   * for example, if multiple 'new-user' events are fired in quick succession for the same email.
   */
  private activeJobs = new Set<string>();
  constructor() {
    super();
    this.events = [
      "new-user",
      "user-verified",
      "password-reset",
      "password-changed",
    ];

    this.initializeListeners();
  }

  /**
   * Emits an event with the given name and data.
   * It first validates if the event name is one of the predefined events.
   * @template T - The type of the event data payload.
   * @param {string} name - The name of the event to emit. Must be one of the events in the `this.events` array.
   * @param {IEventData} eventData - The payload to send with the event.
   * @throws {Error} If the event name is not registered in the `this.events` array.
   */
  emitEvent(name: string, eventData: IEventData) {
    // prevents unauthorized events
    if (!this.events.includes(name)) {
      throw new Error(`Event ${name} does not exist`);
    }

    // Check if a job for this email is already in the queue.
    // This prevents sending multiple emails if the event is emitted multiple times for the same user.
    if (this.activeJobs.has(eventData.email)) {
      console.log(
        `Job for ${eventData.email} is already in the queue. Skipping.`,
      );
      return;
    }

    // emit events
    this.emit(name, eventData);
  }

  /**
   * Sets up listeners for all the events defined in the `this.events` array upon initialization.
   * This ensures that the application is ready to handle any of its core events from the start.
   */
  private initializeListeners() {
    for (const eventName of this.events) {
      this.listenToEvent(eventName);
      console.log(`Listening to event: ${eventName}`);
    }
  }

  /**
   * Attaches a listener to a specific event. This method contains the logic for what should happen when an event is triggered.
   * Currently, it's configured to handle the 'new-user' event by scheduling a one-time email job.
   * @param {string} name - The name of the event to listen for.
   */
  private listenToEvent(name: string) {
    this.on(name, (user: { email: string; firstName: string; otp: string }) => {
      // We only have logic for the 'new-user' event right now.
      // Other events will be caught but will do nothing until logic is added here.
      if (name === "new-user") {
        // Define a delay for the job. Here, it's set to 0.3 minutes (18 seconds).
        const delayInMinutes = 0.3;
        const scheduledTime = new Date(Date.now() + delayInMinutes * 60 * 1000);

        console.log(
          `Add event to queue for ${user.email} to run at ${scheduledTime.toLocaleTimeString()}`,
        );

        // Dynamically create a cron pattern that matches the exact future time for one-time execution.
        // The pattern is "seconds minutes hours day-of-month month day-of-week".
        // The '*' for day-of-week means it will run regardless of the day.
        const cronPattern = `${scheduledTime.getSeconds()} ${scheduledTime.getMinutes()} ${scheduledTime.getHours()} ${scheduledTime.getDate()} ${
          scheduledTime.getMonth() + 1
        } *`;

        // Add the user's email to the active jobs set to lock it.
        this.activeJobs.add(user.email);

        // Schedule the task with node-cron.
        const task = cron.schedule(cronPattern, async () => {
          console.log(`Executing one-time job for user: ${user.email}`);
          try {
            // Use the EmailService to send a welcome email with the OTP.
            await EmailService.sendEmail(
              user.email,
              "Welcome! Verify Your Account",
              "create-account",
              { name: user.firstName, otp: user.otp },
            );
            console.log(`Verification email sent to ${user.email}`);
          } catch (error) {
            // Log any errors that occur during email sending.
            console.error(
              `Failed to send verification email to ${user.email}:`,
              error,
            );
          } finally {
            // The `finally` block ensures that we clean up, regardless of success or failure.
            // Remove the email from the active jobs set to unlock it for future jobs.
            this.activeJobs.delete(user.email);
            // Stop the cron job to ensure it doesn't run again and to free up resources.
            task.stop();
          }
        });
      }
    });
  }
}

/**
 * A singleton instance of the AppEvents class.
 * This ensures that the entire application uses the same event emitter instance,
 * so that an event emitted in one part of the app can be heard by a listener in another.
 */
const eventEmitter = new AppEvents();

export default eventEmitter;
