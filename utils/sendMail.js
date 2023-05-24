const nodeMailer = require("nodemailer");
const handlebars = require("handlebars");

const fs = require("fs");
const path = require("path");

let MY_MAIL = process.env.MY_MAIL; 
let EMAIL_HOST = process.env.EMAIL_HOST;
let MY_PASSWORD = process.env.MY_PASSWORD;

// Mailing function
const sendMail = async (res, email, subject, payload, templateSource) => {
    const transporter = nodeMailer.createTransport({
        service: EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: MY_MAIL,
            pass: MY_PASSWORD
        }
    });

    const source = fs.readFileSync(path.join(__dirname, templateSource), "utf-8");
    const template = handlebars.compile(source)

    // OTL mail template
    const mailTemplate = {
        from: MY_MAIL,
        to: email,
        subject: subject,
        html: template(payload)
    };

    transporter.sendMail(mailTemplate, (error, info) => {
        if(error){
            res.status(400)
            .json({ 
                error: error.message,
            });
        }
        else{
            res.status(200)
            .json({ 
                msg: `Mail sent: ${info.response}`
            });
        }
    });
};

module.exports = sendMail;