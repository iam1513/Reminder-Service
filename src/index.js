const express = require("express")
const bodyParser = require("body-parser")
const { PORT } = require("./config/server-config")
const { sendBasicEmail } = require("./services/email-service")
const TicketController = require("./controllers/ticket-controller")
const jobs = require("./utils/job")
const { createChannel, subscribeMessage } = require("./utils/message-queue")
const { REMINDER_BINDING_KEY } = require("./config/server-config")
const EmailService = require("./services/email-service")
const app = express()

const setUpAndStartServer = async () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    const channel = await createChannel()
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY)

    app.post("/api/v1/tickets", TicketController.create)

    app.listen(PORT, () => {
        console.log(`Live on server ${PORT}`)
        // jobs()

    })
}

setUpAndStartServer()