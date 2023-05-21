import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    auth: (
      req: FastifyRequest,
      res: FastifyReply
    ) => Promise<boolean>;
  }
}
