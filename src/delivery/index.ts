import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from '@fastify/cors'

import User from '../pkg/user/delivery'
import Auth from '../pkg/auth/delivery'
import Contact from '../pkg/contact/delivery'
import Product from '../pkg/product/delivery'
import Role from '../pkg/roles/delivery'

export default class Server {
  server: FastifyInstance;
  services: Interface.Services;

  constructor(services: Interface.Services) {
    this.services = services;
    this.server = Fastify({ logger: true });

    this.server.register(fastifyCors);

    this.server.decorate("auth",
      async (req: FastifyRequest, rep: FastifyReply) => {
        try {
          const token = req.headers.authorization?.split(" ")[1]

          const validation = this.services.auth.validateToken(token)

          // TODO this is hardcoded, should be added when roles are added
          return { ...validation, role: { name: "admin" } }
        } catch (err) {
          console.log("hola", err)
          if (err.code) {
            rep.code(err.code).send({ error: err.message })
          } else {
            rep.code(403).send({ error: err })
          }
        }
      }
    )

    this.server.register(new User(this.services).routes, {
      prefix: "/api/v1/user",
    })
    this.server.register(new Auth(this.services).routes, {
      prefix: "/api/v1/auth"
    })
    this.server.register(new Contact(this.services).routes, {
      prefix: "/api/v1/contact"
    })
    this.server.register(new Product(this.services).routes, {
      prefix: "/api/v1/product"
    })
    this.server.register(new Role(this.services).routes, {
      prefix: "/api/v1/role"
    })
  }

  start = async (port: number) => {
    try {
      this.server.listen({ port, host: "0.0.0.0" }, function (err, _addr) {
        if (err) {
          this.server.log.error(err)
          process.exit(1)
        }
      })
    } catch (err) {
      throw Error("Can't start server");
    }
  }
}
