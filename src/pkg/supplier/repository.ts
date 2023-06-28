import { DataSource, Repository } from "typeorm";

import { Suppliers as SupplierEntity } from "./entity";

import ErrorHTTP from "../../../lib/error";

export default class Supplier implements Interface.SupplierDatabase {
  repository: Repository<SupplierEntity>

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(SupplierEntity)
  }

  get = async (request: Entities.Supplier) => {
    try {
      const { id } = request;
      const response = await this.repository.findOneBy({ id });

      if (!response)
        throw new ErrorHTTP({
          message: `Supplier not Found with id: ${id}`,
          code: 404,
        });

      return response;
    } catch (err) {
      throw err;
    }
  };

  list = async () => {
    try {
      const response = await this.repository.find();

      return response;
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.Supplier) => {
    console.log("HASTA ACÁ LLEGUÉ!!!!!!")
    const response = await this.repository.save(request);

    return response;
  };

  update = async (request: Entities.Supplier) => {
    try {
      const response = await this.repository.update(request.id, request);

      if (response.affected == 0) throw new Error("Affected 0 rows.");

      return await this.get(request);
    } catch (err) {
      throw new Error("Can't update supplier.");
    }
  };

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
        code: 500,
      });
    }
  };
}
