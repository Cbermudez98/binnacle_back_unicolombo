import "reflect-metadata"
import morgan from "morgan";
import express, { Application } from "express";
import { RouterManager } from "./src/modules/RouterManager";

import { appDataSource } from "./src/config/typeorm";
import { ParameterStore } from "./src/utils/Constant";
import Logger from "./src/utils/Logger";

const app: Application = express();
app.use(morgan("dev"));
app.use(express.json());
app.set("PORT", ParameterStore.PORT);

appDataSource.initialize()
    .then(() => Logger.info("Database initialized"))
    .catch((error) => Logger.fatal("Error during database initialization", error));

app.listen((app.get("PORT")), () => {
    Logger.info(`server running at http://localhost:${app.get("PORT")}`);
});

const routerManager = new RouterManager(app);
routerManager.manageRoutes();