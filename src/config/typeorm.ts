import { DataSource } from "typeorm";
import { ParameterStore } from "../utils/Constant";
import { join } from "path";
import { User } from "../modules/users/infrastructure/entity/User.entity";
import { Book } from "../modules/binnacle/infrastructure/entity/Book.entity";
import { BookView } from "../modules/binnacle/infrastructure/entity/BookView.entity";

export const appDataSource = new DataSource({
    type: ParameterStore.DB_DIALECT as any,
    host: ParameterStore.DB_HOST,
    port: ParameterStore.DB_PORT as any,
    username: ParameterStore.DB_USERNAME,
    password: ParameterStore.DB_PASSWORD,
    database: ParameterStore.DB_DATABASE,
    entities: [
        User,
        Book,
        BookView
    ],
    migrations: [
        join(__dirname, "../migrations/**/*.ts")
    ],
    migrationsTableName: "migration_table",
    synchronize: false,
});