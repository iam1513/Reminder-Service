const express = require("express")
const bodyParser = require("body-parser")
const { PORT } = require("./config/server-config")
const { sendBasicEmail } = require("./services/email-service")

const app = express()

const setUpAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(PORT, () => {
        console.log(`Live on server ${PORT}`)

        sendBasicEmail(
            "support@omi.com",
            "reminderservice1513@gmail.com",
            "Test mail",
            "Hey , wasssuppp??"
        )
    })
}

setUpAndStartServer()