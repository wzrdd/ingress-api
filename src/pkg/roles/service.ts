export default class Role implements Interface.Role {
  constructor(private readonly database: Interface.Postgres) {}

  list = async () => {
    const response = await this.database.role.list()

    return response
  };

  create = async (request: Entities.Role) => {
    const response = await this.database.role.create(request)

    return response
  }
}
