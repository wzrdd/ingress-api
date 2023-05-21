"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
const error_1 = require("../../../lib/error");
class User {
    repository;
    constructor(conn) {
        this.repository = conn.getRepository(entity_1.Users);
    }
    getHelper = async (request) => {
        try {
            const { id, email } = request;
            let userNotFound = new error_1.default({ message: "User Not Found", code: 404 });
            if (id) {
                const response = await this.repository.findOneBy({ id });
                if (!response)
                    throw userNotFound;
                return response;
            }
            const response = await this.repository.findOneBy({ email });
            if (!response)
                throw userNotFound;
            return response;
        }
        catch (err) {
            throw err;
        }
    };
    get = async (request) => {
        const response = await this.getHelper(request);
        delete response.password;
        return response;
    };
    getWithPassword = async (request) => {
        return (await this.getHelper(request));
    };
    listUsers = async () => {
        try {
            const response = await this.repository.find();
            return response;
        }
        catch (err) {
            throw err;
        }
    };
    create = async (request) => {
        const response = await this.repository.save(request);
        return response;
    };
    update = async (request) => {
        try {
            const response = await this.repository.update(request.id, request);
            if (response.affected == 0)
                throw new Error("Affected 0 rows.");
            const user = await this.get(request);
            return user;
        }
        catch (err) {
            throw new Error("Can't update user.");
        }
    };
    delete = async (userId) => {
        try {
            await this.repository
                .createQueryBuilder()
                .delete()
                .where({ id: userId })
                .execute();
            return true;
        }
        catch (err) {
            throw new error_1.default({
                message: err.message,
                code: 500
            });
        }
    };
}
exports.default = User;
//# sourceMappingURL=repository.js.map