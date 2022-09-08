import config from '../../config';
import {createTransport, Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class MailSender {
    private static instance: MailSender;
    private _transporter: Transporter<SMTPTransport.SentMessageInfo>;
    static getInstance() {
        return MailSender.instance ??= new MailSender();
    }

    constructor() {
        this._transporter = createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: config.mail.user,
                pass: config.mail.pass,
            },
        })
    }

    async sendMail(mail: {to: string, subject: string, text: string}) {
        const result = await this._transporter.sendMail({
            from: {name: 'Церковные события', address: config.mail.user},
            ...mail,

        })
        console.log(result)
    }
}