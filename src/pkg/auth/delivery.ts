import { FastifyInstance } from "fastify";

export default class Auth {
  constructor(private readonly services: Interface.Services) {}

  routes = async (app: FastifyInstance, {}) => {
    app.post<{ Body: { rut: string, password: string } }>(
      '/sign-in',
      async (request, reply) => {
        try {
          const { rut, password } = request.body;
          const response = await this.services.auth.signIn(rut, password);

          reply.send({ auth: response });
        } catch (err) {
          if (err.code) {
            reply.code(err.code).send({ error: err.message });
          } else {
            reply.send({ error: err.message });
          }
        }
      }
    )

    app.post<{
      Body:
      { token: string }
    }>(
      '/verify-token',
      async (request) => {
        try {
          const response = await this.services.auth.validateToken(request.body.token);

          return response;
        } catch (err) {
          throw err;
        }
      }
    )

    app.get('/log-out', async (req) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const response = await this.services.auth.deleteToken(token);

        return response;
      } catch (err) {
        throw err;
      }
    })

    app.post<{ Body: { id: string, oldPassword: string, newPassword: string } }>(
      '/change-password',
      async (request) => {
        const { id, oldPassword, newPassword } = request.body

        const response = await this.services.auth.changePassword(
          id,
          newPassword,
          oldPassword
        )

        return response
      }
    )
  }
}
