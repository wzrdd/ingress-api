import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from '@fastify/cors'

import User from '../pkg/user/delivery'
import Auth from '../pkg/auth/delivery'
import Contact from '../pkg/contact/delivery'

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
          const token = req.headers.authorization?.split(" ")[1];

          const validation = this.services.auth.validateToken(token);

          return validation;
        } catch (err) {
          if (err.code) {
            rep.code(err.code).send({ error: err.message });
          } else {
            rep.code(500).send({ error: err })
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
  }

  start = async (port: number) => {
    try {
      this.server.listen({ port, host: "0.0.0.0" }, function (err, addr) {
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
