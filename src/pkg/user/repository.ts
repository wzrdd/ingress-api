import { DataSource, Repository } from "typeorm";

import { Users as UserEntity } from "./entity"

import ErrorHTTP from '../../../lib/error'

export default class User implements Interface.UserDatabase {
  repository: Repository<UserEntity>;

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(UserEntity);
  }

  private getHelper = async (request: Entities.User) => {
    try {
      const { id, email } = request;
      let userNotFound = new ErrorHTTP({ message: "User Not Found", code: 404 });

      if (id) {
        const response = await this.repository.findOneBy({ id });

        if (!response)
          throw userNotFound;

        return response;
      }

      const response = await this.repository.findOneBy({ email });

      if (!response)
        throw userNotFound;

      return response;
    } catch (err) {
      throw err;
    }
  }

  get = async (request: Entities.User) => {
    const response = await this.getHelper(request);
    delete response.password;
    return response;
  };

  getWithPassword = async (request: Entities.User) => {
    return (await this.getHelper(request));
  }

  listUsers = async () => {
    try {
      const response = await this.repository.find();

      response.forEach((x) => delete x.password);

      return response;
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.User) => {
    const response = await this.repository.save(request);

    return response;
  }

  update = async (request: Entities.User) => {
    try {
      const response = await this.repository.update(request.id, request);

      if (response.affected == 0)
        throw new Error("Affected 0 rows.")

      const user = await this.get(request);
      return user;
    } catch (err) {
      throw new Error("Can't update user.")
    }
  }

  delete = async (id: string) => {
    try {
      await this.repository
        .createQueryBuilder()
        .delete()
        .where({ id })
        .execute();

      return true;
    } catch (err) {
      throw new ErrorHTTP({
        message: err.message,
        code: 500
      });
    }
  }
}
