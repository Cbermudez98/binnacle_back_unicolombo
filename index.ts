import "reflect-metadata"
import morgan from "morgan";
import express, { Application } from "express";
import { RouterManager } from "./src/modules/RouterManager";

import { appDataSource } from "./src/config/typeorm";
import { ParameterStore } from "./src/utils/Constant";
import Logger from "./src/utils/Logger";
import { App } from "./src/app/app";

const app = new App();

const application = app.getApp();

appDataSource.initialize()
    .then(() => Logger.info("Database initialized"))
    .catch((error) => Logger.fatal("Error during database initialization", error));

application.listen((application.get("PORT")), () => {
    Logger.info(`server running at http://localhost:${application.get("PORT")}`);
});

const routerManager = new RouterManager(application);
routerManager.manageRoutes();