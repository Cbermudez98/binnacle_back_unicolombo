import { IEmail } from "../modules/shared/interfaces/IEmail";

export class MailBuilder {
    private _email: IEmail;

    setTo(to: IEmail["to"]): this {
        this._email["to"] = to;
        return this;
    }

    setFrom(from: IEmail["from"]): this {
        this._email["from"] = from;
        return this;
    }

    setSubject(subject: IEmail["subject"]): this {
        this._email["subject"] = subject;
        return this;
    }

    setHtml(html: IEmail["html"]): this {
        this._email["html"] = html;
        return this;
    }

    build(): IEmail {
        const copyMail = { ...this._email };
        this._email = {} as IEmail;
        return copyMail;
    }
}