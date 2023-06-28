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

export default class Supplier {
  services: Interface.Services;
  session: any
  authorization: any
  rbac: RBACI

  constructor(services: Interface.Services) {
    this.services = services;
    this.rbac = {
      admin: queryRoles,
      logistico: queryRoles,
      operador: {
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
        name: string,
        email: string,
        phone: string,
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
        const { name, email, phone } = request.body;

        const supplier: Entities.Supplier = { name, email, phone }
        const response = await this.services.supplier.create(supplier);

        return { supplier: response };
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
          const supplier: Entities.Supplier = { id: request.params.id }
          const response = await this.services.supplier.get(supplier);

          return { supplier: response };
        } catch (err) {
          throw new Error(err);
        }
      });

    app.get('/suppliers',
      {
        preValidation: async (req, res) => {
          this.session = await app.auth(req, res)
          this.authorization = new Authorization(this.session, this.rbac)
          this.authorization.can("list")
        }
      },
      async () => {
        try {
          const response = await this.services.supplier.list();

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
          this.authorization.can("delete")
        }
      },
      async (request) => {
        try {
          const response = await this.services.supplier.delete(request.params.id)

          return { deleted: response }
        } catch (err) {
          throw err;
        }
      });

    app.post<{
      Body: {
        name: string,
        email: string,
        phone: string,
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
          const supplier: Entities.Supplier = { id: request.params.id }

          const { name, email, phone } = request.body;
          if (name) supplier.name = name
          if (email) supplier.email = email
          if (phone) supplier.phone = phone

          const response = await this.services.supplier.update(supplier);
          return { supplier: response };
        } catch (err) {
          throw err;
        }
      }
    );
  }
}
