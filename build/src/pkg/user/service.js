"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class User {
    database;
    constructor(database) {
        this.database = database;
    }
    get = async (request) => {
        const response = await this.database.user.get(request);
        return response;
    };
    getWithPassword = async (request) => {
        const response = await this.database.user.getWithPassword(request);
        return response;
    };
    listUsers = async () => {
        try {
            return await this.database.user.listUsers();
        }
        catch (err) {
            throw err;
        }
    };
    create = async (request) => {
        if (!request.password)
            throw new Error("Password missing.");
        request.password = await (0, bcrypt_1.hash)(request.password, 10);
        const response = await this.database.user.create(request);
        return response;
    };
    update = async (request) => {
        try {
            const response = await this.database.user.update(request);
            return response;
        }
        catch (err) {
            throw new Error("Can't update user.");
        }
    };
    delete = async (userId) => {
        try {
            const response = await this.database.user.delete(userId);
            if (response)
                await this.database.auth.delete({ id: userId });
            return response;
        }
        catch (err) {
            throw Error("Can't delete user");
        }
    };
}
exports.default = User;
//# sourceMappingURL=service.js.map