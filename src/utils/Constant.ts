import { config } from "dotenv";
config();

export class ParameterStore {
    static readonly PORT = process?.env?.PORT || 8080;
    static readonly URL_DRIVE_BINNACLE = process?.env?.URL_DRIVE_BINNACLE || "test";
    static readonly DB_USERNAME = process?.env?.DB_USERNAME || "test";
    static readonly DB_PASSWORD = process?.env?.DB_PASSWORD || "test";
    static readonly DB_DATABASE = process?.env?.DB_DATABASE || "test";
    static readonly DB_HOST = process?.env?.DB_HOST || "localhost";
    static readonly DB_DIALECT = process?.env?.DB_DIALECT || "mysql";
    static readonly DB_PORT = process?.env?.DB_PORT || 3306;
    static readonly JWT_KEY = process?.env?.JWT_KEY || "test"
    static readonly URL_FRONT = process?.env?.URL_FRONT || "test";
    static readonly URL_BUCKET_PDF = "pdfs";

    // Email
    static readonly EMAIL_SERVICE = process?.env?.EMAIL_SERVICE || "test";
    static readonly EMAIL_HOST = process?.env?.EMAIL_HOST || "test";
    static readonly EMAIL = process?.env?.EMAIL || "test";
    static readonly EMAIL_PASSWORD = process?.env?.EMAIL_PASSWORD || "test";

    // Firebase
    static readonly API_KEY = process?.env?.API_KEY || "test";
    static readonly AUTH_DOMAIN = process?.env?.AUTH_DOMAIN || "test";
    static readonly PROJECT_ID = process?.env?.PROJECT_ID || "test";
    static readonly STORAGE_BUCKET = process?.env?.STORAGE_BUCKET || "test";
    static readonly MESSAGING_SENDER_ID = process?.env?.MESSAGING_SENDER_ID || "test";
    static readonly APP_ID = process?.env?.APP_ID || "test";
}