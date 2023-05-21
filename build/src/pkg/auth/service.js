"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const error_1 = require("../../../lib/error");
class Auth {
    database;
    saltRounds;
    constructor(database) {
        this.database = database;
        this.saltRounds = 10;
    }
    signIn = async (email, password) => {
        try {
            const user = await this.database.user.getWithPassword({ email });
            if (!user)
                throw new Error("Can't find user.");
            if (!user.password)
                throw new Error("Not registered password.");
            const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch)
                throw new Error("Password not match.");
            const token = await (0, bcrypt_1.hash)(`${password}${new Date()}`, this.saltRounds);
            const response = await this.database.auth.create({
                userId: user.id,
                token
            });
            return response;
        }
        catch (err) {
            throw err;
        }
    };
    validateToken = async (token) => {
        try {
            const t = await this.database.auth.get({ token: token });
            if (!t)
                throw new Error("Token not valid.");
            const user = await this.database.user.get({ id: t.userId });
            return { message: "OK", code: 200, user };
        }
        catch (err) {
            throw new error_1.default({ message: "Unauthorized", code: 401 });
        }
    };
    deleteToken = async (token) => {
        try {
            const response = await this.database.auth.delete({ token: token });
            if (response === false)
                throw new Error("Cannot delete token.");
            return response;
        }
        catch (err) {
            throw err;
        }
    };
    changePassword = async (id, oldPassword, newPassword) => {
        try {
            const user = await this.database.user.getWithPassword({ id: id });
            if (!user)
                throw new Error("User not found.");
            const comparePassword = await (0, bcrypt_1.compare)(oldPassword, user.password);
            if (!comparePassword)
                throw new Error("Password don't match");
            user.password = await (0, bcrypt_1.hash)(newPassword, this.saltRounds);
            await this.database.user.update(user);
            return true;
        }
        catch (err) {
            throw new err;
        }
    };
}
exports.default = Auth;
//# sourceMappingURL=service.js.map