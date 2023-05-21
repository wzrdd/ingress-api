"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    services;
    constructor(services) {
        this.services = services;
    }
    routes = async (app, {}) => {
        app.post('/signin', async (request, reply) => {
            try {
                const { email, password } = request.body;
                const response = await this.services.auth.signIn(email, password);
                reply.send({ auth: response });
            }
            catch (err) {
                if (err.code) {
                    reply.code(err.code).send({ error: err.message });
                }
                else {
                    reply.send({ error: err.message });
                }
            }
        });
        app.post('/verify-token', async (request) => {
            try {
                const response = await this.services.auth.validateToken(request.body.token);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
        app.get('/logout', async (req) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const response = await this.services.auth.deleteToken(token);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
        app.post('/change-password', async (request) => {
            const { id, oldPassword, newPassword } = request.body;
            const response = await this.services.auth.changePassword(id, newPassword, oldPassword);
            return response;
        });
    };
}
exports.default = Auth;
//# sourceMappingURL=delivery.js.map