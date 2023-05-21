"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../pkg/user/service");
const service_2 = require("../pkg/auth/service");
class Services {
    user;
    auth;
    constructor(postgres) {
        this.user = new service_1.default(postgres);
        this.auth = new service_2.default(postgres);
    }
}
exports.default = Services;
//# sourceMappingURL=index.js.map