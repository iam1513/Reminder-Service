const cron = require("node-cron")
const emailService = require("../services/email-service")
const sender = require("../config/email-config")

const setUpJobs = async () => {
    cron.schedule("*/2 * * * * ", async () => {
        const response = await emailService.fetchPendingEmails()
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content

            }, async (error, data) => {
                if (error) {
                    console.log(error)
                }
                else {
                    await emailService.updateTicket(email.id, { status: "SUCCESS" })
                }
            })
        });

        console.log(response)
    })
}

module.exports = setUpJobs