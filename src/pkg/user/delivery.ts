import { FastifyInstance } from "fastify";
import Authorization, { RBACI } from "../../../lib/rbac";

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
      admin: queryRoles,
      operador: queryRoles,
      user: { can: { get: { where: { user: "true" } } } }
    }
  }

  // TODO This shouldn't exists. The deployment should include 1 super-admin (us)
  // and 1 admin for the client. This is blocked by the RBAC implementation.
  routes = async (app: FastifyInstance) => {
    app.post<{
      Body: {
        name: string,
        lastName: string,
        rut: string,
        email: string,
        phone: string,
        password: string
      }
    }>(
      '/create',
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
        const response = await this.services.user.create(user);

        delete response.password;
        return { user: response };
      }
    )

    app.get<{
      Params: { id: string }
    }>(
      "/:id",
      { preValidation: [app.auth] },
      async (request) => {
        try {
          const user: Entities.User = { id: request.params.id }
          const response = await this.services.user.get(user);

          return { user: response };
        } catch (err) {
          throw new Error(err);
        }
      });

    app.get('/users', {
      preValidation: async (req, res) => {
        this.session = await app.auth(req, res)
        this.authorization = new Authorization(this.session, this.rbac)
        this.authorization.can("get")
      }
    }, async () => {
      try {
        const response = await this.services.user.listUsers();

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
      { preValidation: [app.auth] },
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
      { preValidation: [app.auth] },
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
