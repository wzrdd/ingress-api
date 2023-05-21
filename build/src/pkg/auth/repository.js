"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../../lib/error");
const entity_1 = require("./entity");
class Auth {
    conn;
    repository;
    constructor(conn) {
        this.conn = conn;
        this.repository = this.conn.getRepository(entity_1.Auths);
    }
    get = async (request) => {
        try {
            const response = await this.repository.findOneBy({ token: request.token });
            if (!response)
                throw new error_1.default({ message: "Unauthorized", code: 401 });
            return response;
        }
        catch (err) {
            throw new Error("Can't check token.");
        }
    };
    create = async (request) => {
        try {
            const response = await this.repository.save(request);
            return response;
        }
        catch (err) {
            throw new Error("Can't save token/userID pair");
        }
    };
    delete = async (request) => {
        try {
            const result = await this.repository.delete({ token: request.token });
            if (result.affected > 0)
                return true;
            else
                return false;
        }
        catch (err) {
            throw new Error("Can't delete token/userID pair.");
        }
    };
}
exports.default = Auth;
//# sourceMappingURL=repository.js.map