import { FastifyInstance } from "fastify";
import Authorization, { RBACI } from "../../../lib/rbac";

import ErrorHTTP from '../../../lib/error'

const queryRoles = {
  can: {
    get: { where: { user: "true" } },
    list: { where: { user: "true" } },
    create: { where: { user: "true" } },
    update: { where: { user: "true" } },
  }
}

export default class User {
  services: Interface.Services
  session: any
  authorization: any
  rbac: RBACI

  constructor(services: Interface.Services) {
    this.services = services
    this.rbac = {
      Admin: queryRoles,
      Cliente: queryRoles,
      Logistico: {
        can: {
          get: { where: { user: "true" } },
          update: { where: { user: "true" } },
          delete: { where: { user: "true" } }
        }
      },
      Operario: {
        can: {
          get: { where: { user: "true" } },
          update: { where: { user: "true" } },
          delete: { where: { user: "true" } }
        }
      },
    }
  }

  routes = async (app: FastifyInstance) => {
    app.post<{
      Body: {
        name: string,
        lastName: string,
        rut: string,
        email: string,
        phone: string,
        password: string,
        role: string
      }
    }>(
      '/create',
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)
          this.authorization.can("create")
        }
      },
      async (request) => {
        const { name, lastName, rut, email, phone, password, role } = request.body;

        const user: Entities.User = {
          name,
          lastName,
          rut,
          email,
          phone,
          password,
          role
        }
        const response = await this.services.user.create(user);

        delete response.password;
        return { user: response };
      }
    )

    app.post<{
      Body: {
        name: string,
        lastName: string,
        rut: string,
        email: string,
        phone: string,
        password: string,
      }
    }>(
      '/create-admin',
      async (request) => {
        const { name, lastName, rut, email, phone, password } = request.body;

        const user: Entities.User = {
          name,
          lastName,
          rut,
          email,
          phone,
          password
        }

        const response = await this.services.user.createAdmin(user);

        delete response.password;
        return { user: response };
      }
    )
    app.get<{
      Params: { id: string }
    }>(
      "/:id",
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)

          if (this.session.user.id != req.params.id) {
            throw new ErrorHTTP({
              message: "Solo puedes ver tus propios datos.",
              code: 403
            });
          }

          this.authorization.can("get")
        }
      },
      async (request) => {
        try {
          const user: Entities.User = { id: request.params.id }
          const response = await this.services.user.get(user);

          return { user: response };
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code
          });
        }
      });

    app.get<
      {
        Querystring: {
          rol?: string
        }
      }>('/users', {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)
          this.authorization.can("list")
        }
      },
        async (request) => {
          try {
            const role = request.query.rol
            const response = await this.services.user.list({ role });

            return response;
          } catch (err) {
            throw err;
          }
        });

    app.delete<{
      Params:
      { id: string }
    }>(
      '/:id',
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)

          if (this.session.user.id != req.params.id) {
            throw new ErrorHTTP({
              message: "Solo puedes eliminarte a ti, no otro usuario.",
              code: 403
            });
          }

          this.authorization.can("delete")
        }
      },
      async (request) => {
        try {
          const response = await this.services.user.delete(request.params.id)

          return { deleted: response }
        } catch (err) {
          throw err;
        }
      });

    app.post<{
      Body: {
        name: string,
        lastName: string,
        email: string,
        password: string
      },
      Params: {
        id: string
      }
    }>(
      '/:id',
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)

          if (this.session.user.id != req.params.id) {
            throw new ErrorHTTP({
              message: "Solo puedes actualizarte a ti, no otro usuario.",
              code: 403
            });
          }

          this.authorization.can("update")
        }
      },
      async (request) => {
        try {
          const user: Entities.User = { id: request.params.id }

          const { name, lastName, email, password } = request.body;

          if (name) user.name = name;
          if (lastName) user.lastName = lastName;
          if (email) user.email = email;
          if (password) user.password = password;

          const response = await this.services.user.update(user);
          return { user: response };
        } catch (err) {
          throw err;
        }
      }
    );
  }
}
