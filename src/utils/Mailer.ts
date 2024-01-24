import { createTransport } from "nodemailer"
import { IEmail } from "../modules/shared/interfaces/IEmail";
import { ParameterStore } from "./Constant";

class Mailer {
    private _transport;

    constructor() {
        this._transport = createTransport({
            host: ParameterStore.EMAIL_HOST,
            service: ParameterStore.EMAIL_SERVICE,
            secure: true,
            auth: {
                user: ParameterStore.EMAIL,
                pass: ParameterStore.EMAIL_PASSWORD
            }
        });
    }

    public async send(email: IEmail) {
        try {
            await this._transport.sendMail({
                from: email.from,
                to: email.to,
                subject: email.subject,
                html: email.html
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new Mailer();