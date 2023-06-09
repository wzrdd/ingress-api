import ErrorHTTP from "../error";

export interface RBACI {
  [role: string]: {
    can: {
      [operation: string]: {
        where: { [type: string]: string };
        root?: boolean;
      };
    };
  };
}

export default class Authorization {
  session: any
  roles: RBACI
  params: {}

  constructor(session: any, roles: RBACI) {
    this.roles = roles;
    this.session = session;
    this.params = {};
  }

  can = (operation: string) => {
    this.user(operation)
  }

  user(operation: string) {
    if (!this.roles[this.session.role.name])
      throw new ErrorHTTP({
        message: `El rol ${this.session.role.name}, no tiene permisos para este recurso`,
        code: 403
      });
    if (!this.roles[this.session.role.name].can[operation])
      throw new ErrorHTTP({
        message: `No puede: ${operation}`,
        code: 403
      });

    if (!this.roles[this.session.role.name].can[operation].where) return;
    this.params = this.getParams(
      this.roles[this.session.role.name].can[operation].where
    );
    return;
  }

  getParams = (where: {}) => {
    const params = {};

    for (let [key, _value] of Object.entries(where)) {
      params[key] = this.session[key]
    }
    return params
  }
}

/*
 * verbs: get, list, create, update, delete
 * Roles:
 * Admin
 * Cliente
 * Operador
 * Logistico
 */
