import { FastifyInstance } from "fastify";

export default class Product {
  services: Interface.Services;

  constructor(services: Interface.Services) {
    this.services = services;
  }

  routes = async (app: FastifyInstance) => {
    app.post<{
      Body: {
        name: string,
        quantityUnit: string,
        quantityValue: number,
        description: string
      }
    }>(
      '/create',
      async (request) => {
        const { name, quantityUnit, quantityValue, description } = request.body;

        const product: Entities.Product = { name, quantityUnit, quantityValue, description }
        const response = await this.services.product.create(product);

        return { product: response };
      }
    )

    app.get<{
      Params: { id: string }
    }>(
      "/:id",
      { preValidation: [app.auth] },
      async (request) => {
        try {
          const product: Entities.Product = { id: request.params.id }
          const response = await this.services.product.get(product);

          return { product: response };
        } catch (err) {
          throw new Error(err);
        }
      });

    app.get('/products', { preValidation: [app.auth] }, async () => {
      try {
        const response = await this.services.product.list();

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
          const response = await this.services.product.delete(request.params.id)

          return { deleted: response }
        } catch (err) {
          throw err;
        }
      });

    app.post<{
      Body: {
        name: string,
        quantityUnit: string,
        quantityValue: number,
        quantityValueAlert: number,
        description: string
      },
      Params: {
        id: string
      }
    }>(
      '/:id',
      { preValidation: [app.auth] },
      async (request) => {
        try {
          const product: Entities.Product = { id: request.params.id }

          const { name, quantityUnit, quantityValue, quantityValueAlert, description } = request.body;
          if (name) product.name = name
          if (quantityUnit) product.quantityUnit = quantityUnit
          if (quantityValue) product.quantityValue = quantityValue
          if (quantityValueAlert) product.quantityValueAlert = quantityValueAlert
          if (description) product.description = description

          const response = await this.services.product.update(product);
          return { product: response };
        } catch (err) {
          throw err;
        }
      }
    );
  }
}
