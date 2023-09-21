import "reflect-metadata"
import express, { Application } from "express";
import { RouterManager } from "./src/modules/RouterManager";

import { appDataSource } from "./src/config/typeorm";
import { ParameterStore } from "./src/utils/Constant";

const app: Application = express();
app.use(express.json());
app.set("PORT", ParameterStore.PORT);

appDataSource.initialize()
    .then(() => console.log("Database initialized"))
    .catch((error) => console.log("Error during database initialization", error));

app.listen((app.get("PORT")), () => {
    console.log(`server running at http://localhost:${app.get("PORT")}`);
});

const routerManager = new RouterManager(app);
routerManager.manageRoutes();