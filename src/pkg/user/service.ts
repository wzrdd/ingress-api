import { hash } from "bcrypt";

export default class User implements Interface.UserService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.User) => {
    const response = await this.database.user.get(request);

    return response;
  };

  getWithPassword = async (request: Entities.User) => {
    const response = await this.database.user.getWithPassword(request);

    return response;
  };

  // TODO this should be called list
  listUsers = async () => {
    try {
      return await this.database.user.listUsers();
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.User) => {
    if (!request.password)
      throw new Error("Password missing.")

    request.password = await hash(request.password, 10);

    const response = await this.database.user.create(request);

    return response;
  };

  update = async (request: Entities.User) => {
    try {
      const response = await this.database.user.update(request);

      return response;
    } catch (err) {
      throw new Error("Can't update user.")
    }
  };

  // TODO userId should be id
  delete = async (userId: string) => {
    try {
      const response = await this.database.user.delete(userId);
      if (response) await this.database.auth.delete({ id: userId })

      return response;
    } catch (err) {
      throw Error("Can't delete user");
    }
  };
}
