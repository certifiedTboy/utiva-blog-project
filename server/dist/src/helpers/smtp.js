import nodemailer, {} from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, } from "../lib/constants.js";
/**
 * @class EmailService
 * @description Handles sending emails using nodemailer and EJS templates.
 */
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
    }
    /**
     * Sends an email using an EJS template.
     * @param to - The recipient's email address.
     * @param subject - The subject of the email.
     * @param template - The name of the EJS template file (without the .ejs extension).
     * @param data - The data to pass to the EJS template.
     */
    async sendEmail(to, subject, template, data) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const templatePath = path.join(__dirname, `./templates/${template}.ejs`);
        try {
            const html = await ejs.renderFile(templatePath, data);
            const mailOptions = { from: EMAIL_FROM, to, subject, html };
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Could not send email.");
        }
    }
}
export default new EmailService();
