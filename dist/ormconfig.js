"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
require("dotenv/config");
const { db_host, db_username, db_password, db_name } = process.env;
exports.typeOrmConfig = {
    type: 'mysql',
    username: db_username,
    password: db_password,
    port: 3306,
    host: db_host,
    database: db_name,
    autoLoadEntities: true,
    logging: true,
    entities: ['src/**/*.entity{ .ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsRun: true,
};
module.exports = exports.typeOrmConfig;
//# sourceMappingURL=ormconfig.js.map