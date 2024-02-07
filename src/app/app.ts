import express, { Application } from "express";
import { ParameterStore } from "../utils/Constant";
import morgan from "morgan";

export class App {
    private readonly _application: Application;

    constructor() {
        this._application = express();
        this.setMiddlewares();
    }
    public getApp(): Application {
        return this._application;
    }

    private setMiddlewares() {
        this._application.use(morgan("dev"));
        this._application.use(express.json({ limit: "50mb" }));
        this._application.set("PORT", ParameterStore.PORT);
    }
}