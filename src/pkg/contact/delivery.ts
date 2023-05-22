import { FastifyInstance } from "fastify";

export default class Contact {
  services: Interface.Services;

  constructor(services: Interface.Services) {
    this.services = services;
  }

  routes = async (app: FastifyInstance) => {
    app.post<{
      Body: {
        email: string,
        message: string,
        status: string
      }
    }>(
      '/create',
      async (request) => {
        const { email, message, status } = request.body;

        const contact: Entities.Contact = { email, message, status }
        const response = await this.services.contact.create(contact);

        return { contact: response };
      }
    )

    app.get<{
      Params: { id: string }
    }>(
      "/:id",
      { preValidation: [app.auth] },
      async (request) => {
        try {
          const contact: Entities.Contact = { id: request.params.id }
          const response = await this.services.contact.get(contact);

          return { contact: response };
        } catch (err) {
          throw new Error(err);
        }
      });

    app.get('/contacts', { preValidation: [app.auth] }, async () => {
      try {
        const response = await this.services.contact.list();

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
          const response = await this.services.contact.delete(request.params.id)

          return response;
        } catch (err) {
          throw err;
        }
      });

    app.post<{
      Body: {
        email: string,
        message: string,
        status: string
      },
      Params: {
        id: string
      }
    }>(
      '/:id',
      { preValidation: [app.auth] },
      async (request) => {
        try {
          const contact: Entities.Contact = { id: request.params.id }

          const { status } = request.body;
          contact.status = status

          const response = await this.services.contact.update(contact);
          return { contact: response };
        } catch (err) {
          throw err;
        }
      }
    );
  }
}
