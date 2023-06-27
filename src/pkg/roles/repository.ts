import { DataSource, Repository } from "typeorm";

import { Roles as RoleEntity } from "./entity"

export default class Role implements Interface.Role {
  repository: Repository<RoleEntity>

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(RoleEntity);
  }

  list = async () => {
    try {
      const response = await this.repository.find({});

      return response;
    } catch (err) {
      throw err
    }
  };

  create = async (request: Entities.Role) => {
    const response = await this.repository.save(request);

    return response;
  };
}
