import { DataSource } from "typeorm";
import { ParameterStore } from "../utils/Constant";
import { join } from "path";

export const appDataSource = new DataSource({
    type: ParameterStore.DB_DIALECT as any,
    host: ParameterStore.DB_HOST,
    port: ParameterStore.DB_PORT as any,
    username: ParameterStore.DB_USERNAME,
    password: ParameterStore.DB_PASSWORD,
    database: ParameterStore.DB_DATABASE,
    entities: [
        join(__dirname, "../modules/**/infrastructure/entity/*.entity.ts")
    ],
    migrations: [
        join(__dirname, "../migrations/**/*.ts")
    ],
    migrationsTableName: "migration_table",
    synchronize: false,
});