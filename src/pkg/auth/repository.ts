import { DataSource, Repository } from "typeorm";

import ErrorHTTP from "../../../lib/error";
import { Auths } from "./entity";

export default class Auth implements Interface.AuthDatabase {
  conn: DataSource;
  repository: Repository<Auths>;

  constructor(conn: DataSource) {
    this.conn = conn;
    this.repository = this.conn.getRepository(Auths);
  }

  get = async (request: Entities.Auth) => {
    try {
      const response = await this.repository.findOneBy({ token: request.token });

      if (!response)
        throw new ErrorHTTP({ message: "Unauthorized", code: 401 });

      return response;
    } catch (err) {
      throw new Error("Can't check token.");
    }
  }

  create = async (request: Entities.Auth) => {
    try {
      const response = await this.repository.save(request);

      return response;
    } catch (err) {
      throw new Error("Can't save token/userID pair");
    }
  };

  delete = async (request: Entities.Auth) => {
    try {
      const result = await this.repository.delete({ token: request.token });

      if (result.affected > 0) return true;
      else return false;
    } catch (err) {
      throw new Error("Can't delete token/userID pair.")
    }
  }
}
