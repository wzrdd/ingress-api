"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const fastify_cors_1 = require("fastify-cors");
const delivery_1 = require("../pkg/user/delivery");
const delivery_2 = require("../pkg/auth/delivery");
class Server {
    server;
    services;
    constructor(services) {
        this.services = services;
        this.server = (0, fastify_1.default)({ logger: true });
        this.server.register(fastify_cors_1.default);
        this.server.decorate("auth", async (req, rep) => {
            try {
                const token = req.headers.authorization?.split(" ")[1];
                const validation = this.services.auth.validateToken(token);
                return validation;
            }
            catch (err) {
                if (err.code) {
                    rep.code(err.code).send({ error: err.message });
                }
                else {
                    rep.code(500).send({ error: err });
                }
            }
        });
        this.server.register(new delivery_1.default(this.services).routes, {
            prefix: "/api/v1/user",
        });
        this.server.register(new delivery_2.default(this.services).routes, {
            prefix: "/api/v1/auth"
        });
    }
    start = async (port) => {
        try {
            this.server.listen({ port, host: "0.0.0.0" }, function (err, addr) {
                if (err) {
                    this.server.log.error(err);
                    process.exit(1);
                }
                this.server.log.info(`server listening on ${addr}`);
            });
        }
        catch (err) {
            throw Error("Can't start server");
        }
    };
}
exports.default = Server;
//# sourceMappingURL=index.js.map