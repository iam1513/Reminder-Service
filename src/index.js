const express = require("express")
const bodyParser = require("body-parser")
const { PORT } = require("./config/server-config")
const { sendBasicEmail } = require("./services/email-service")
const TicketController = require("./controllers/ticket-controller")
const jobs = require("./utils/job")

const app = express()

const setUpAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post("/api/v1/tickets", TicketController.create)

    app.listen(PORT, () => {
        console.log(`Live on server ${PORT}`)
        jobs()
        // sendBasicEmail(
        //     "support@omi.com",
        //     "reminderservice1513@gmail.com",
        //     "Test mail",
        //     "Hey , wasssuppp??"
        // )
    })
}

setUpAndStartServer()