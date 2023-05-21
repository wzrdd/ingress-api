"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entity_1 = require("../../pkg/user/entity");
const entity_2 = require("../../pkg/auth/entity");
const repository_1 = require("../../pkg/user/repository");
const repository_2 = require("../../pkg/auth/repository");
class Postgres {
    host;
    port;
    username;
    password;
    database;
    user;
    auth;
    conn;
    constructor(host, port, username, password, database) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
    }
    init = async () => {
        try {
            const conn = new typeorm_1.DataSource({
                type: "postgres",
                host: this.host,
                port: this.port,
                username: this.username,
                password: this.password,
                database: this.database,
                entities: [
                    entity_1.Users,
                    entity_2.Auths,
                ],
                logging: false,
                synchronize: true,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            });
            if (!conn)
                throw new Error("Connection undefined");
            this.conn = conn;
            this.user = new repository_1.default(conn);
            this.auth = new repository_2.default(conn);
        }
        catch (err) {
            throw err;
        }
    };
}
exports.default = Postgres;
//# sourceMappingURL=index.js.map