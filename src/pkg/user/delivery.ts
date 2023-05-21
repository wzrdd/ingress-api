import { FastifyInstance } from "fastify";

export default class User {
  services: Interface.Services;

  constructor(services: Interface.Services) {
    this.services = services;
  }

  // TODO This shouldn't exists. The deployment should include 1 super-administrator (us)
  // and 1 administrator (the client) with
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
        console.log("Hello Name ", request.body)
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

    app.get('/users', { preValidation: [app.auth] }, async () => {
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

          return response;
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
