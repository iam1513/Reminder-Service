const sender = require("../config/email-config")
const TicketRepository = require("../repository/ticket-repository")
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {

    sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody

    })
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const ticketRepository = new TicketRepository()
        const response = await ticketRepository.get({ status: "PENDING" })
        return response

    } catch (error) {
        console.log(error)
        throw error
    }
}

const createNotification = async (data) => {
    try {
        const ticketRepository = new TicketRepository()
        const response = await ticketRepository.create(data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const ticketRepository = new TicketRepository()
        const response = await ticketRepository.update(ticketId, data)
        return response

    } catch (error) {
        console.log(error)
        throw error
    }
}

const subscribeEvents = async (payload) => {
    let service = payload.service
    let data = payload.data
    switch (service) {
        case "CREATE_TICKET":
            await createNotification(data)
            break;

        case "SEND_BASIC_MAIL":
            await sendBasicEmail(data)
            break;
        default:
            console.log("No Valid events received.")
            break;
    }
}

module.exports = {
    sendBasicEmail, fetchPendingEmails, createNotification, updateTicket, subscribeEvents
}