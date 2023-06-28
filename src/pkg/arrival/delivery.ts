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

export default class Arrival {
  services: Interface.Services
  session: any
  authorization: any
  rbac: RBACI

  constructor(services: Interface.Services) {
    this.services = services
    this.rbac = {
      Admin: queryRoles,
      Cliente: queryRoles,
      Logistico: queryRoles,
      Operario: {
        can: {
          get: { where: { user: "true" } },
          list: { where: { user: "true" } },
        }
      },
    }
  }

  routes = async (app: FastifyInstance) => {
    app.post<{
      Body: {
        entryDate: Date,
        productId: string[],
        supplierId: string,
        aditionalNotes: string
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
        try {
          const { entryDate, productId, supplierId, aditionalNotes } = request.body;

          const arrival: Entities.Arrival = {
            entryDate,
            productId,
            supplierId,
            aditionalNotes
          }
          const response = await this.services.arrival.create(arrival);

          return { arrival: response };
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code || 500
          });
        }
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
          this.authorization.can("get")
        }
      },
      async (request) => {
        try {
          const arrival: Entities.Arrival = { id: request.params.id }

          const response = await this.services.arrival.get(arrival);

          return { arrival: response };
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code
          });
        }
      });

    app.post<{
      Body: {
        days?: number,
      }
    }>('/arrivals',
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)
          this.authorization.can("list")
        }
      },
      async (request) => {
        try {
          const days = request.body?.days || 999999

          const response = await this.services.arrival.list(days);

          return response;
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code || 500,
          });
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
          this.authorization.can("delete")
        }
      },
      async (request) => {
        try {
          const response = await this.services.user.delete(request.params.id)

          return { deleted: response }
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code || "500"
          });
        }
      });

    app.post<{
      Body: {
        entryDate: Date,
        productId: string[],
        supplierId: string,
        aditionalNotes: string
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
          this.authorization.can("update")
        }
      },
      async (request) => {
        try {
          const arrival: Entities.Arrival = { id: request.params.id }

          const { entryDate, productId, supplierId, aditionalNotes } = request.body;

          if (entryDate) arrival.entryDate = entryDate
          if (productId) arrival.productId = productId
          if (supplierId) arrival.supplierId = supplierId
          if (aditionalNotes) arrival.aditionalNotes = aditionalNotes

          const response = await this.services.arrival.update(arrival);
          return { arrival: response };
        } catch (err) {
          throw new ErrorHTTP({
            message: err.message,
            code: err.code || "500"
          });
        }
      }
    );
  }
}
