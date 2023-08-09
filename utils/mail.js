const fs = require("fs")
const path = require("path")
const nodeMailer = require("nodemailer")
const handlebars = require("handlebars")

let mail = process.env.MY_MAIL 
let host = process.env.EMAIL_HOST
let password = process.env.MY_PASSWORD

// Mailing function
const sendMail = async (res, email, subject, payload, templateSource) => {
    const transporter = nodeMailer.createTransport({
        service: host,
        port: 465,
        secure: true,
        auth: {
            user: mail,
            pass: password
        }
    })

    const source = fs.readFileSync(path.join(__dirname, templateSource), "utf-8")
    const template = handlebars.compile(source)

    // OTL mail template
    const mailTemplate = {
        from: mail,
        to: email,
        subject: subject,
        html: template(payload)
    }

    transporter.sendMail(mailTemplate, (error, info) => {
        if(error) res.status(400).json({ error: error.message })
        else res.status(200).json({ msg: `Mail sent: ${info.response}` })
    })
}

module.exports = sendMail