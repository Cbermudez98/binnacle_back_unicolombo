import { Router } from "express";

export interface IRouterModule {
    initRoutes: () => Router;
}