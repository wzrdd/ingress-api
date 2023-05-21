"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    services;
    constructor(services) {
        this.services = services;
    }
    routes = async (app) => {
        app.post('/create', async (request) => {
            const { name, lastName, email, password } = request.body;
            const user = {
                name,
                lastName,
                email,
                password
            };
            const response = await this.services.user.create(user);
            delete response.password;
            return { user: response };
        });
        app.get("/:id", { preValidation: [app.auth] }, async (request) => {
            try {
                const user = { id: request.params.id };
                const response = await this.services.user.get(user);
                return { user: response };
            }
            catch (err) {
                throw new Error(err);
            }
        });
        app.get('/users', { preValidation: [app.auth] }, async () => {
            try {
                const response = await this.services.user.listUsers();
                return response;
            }
            catch (err) {
                throw err;
            }
        });
        app.delete('/:id', { preValidation: [app.auth] }, async (request) => {
            try {
                const response = await this.services.user.delete(request.params.id);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
        app.post('/:id', { preValidation: [app.auth] }, async (request) => {
            try {
                const user = { id: request.params.id };
                const { name, lastName, email, password } = request.body;
                if (name)
                    user.name = name;
                if (lastName)
                    user.lastName = lastName;
                if (email)
                    user.email = email;
                if (password)
                    user.password = password;
                const response = await this.services.user.update(user);
                return { user: response };
            }
            catch (err) {
                throw err;
            }
        });
    };
}
exports.default = User;
//# sourceMappingURL=delivery.js.map