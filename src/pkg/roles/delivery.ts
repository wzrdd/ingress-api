import { FastifyInstance } from "fastify";

export default class Role {
  services: Interface.Services;

  constructor(services: Interface.Services) {
    this.services = services;
  }

  routes = async (app: FastifyInstance) => {
    app.get("/", async (_request) => {
      try {
        const response = await this.services.role.list();

        return {
          role: response,
        };
      } catch (err) {
        throw new Error(err);
      }
    });

    app.post<{ Body: { name: string } }>("/", async (request) => {
      const { name } = request.body;

      const response = await this.services.role.create({
        name,
      });

      return {
        role: response,
      };
    });
  };
}
