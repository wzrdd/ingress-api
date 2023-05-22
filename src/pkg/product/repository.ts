import { DataSource, Repository } from "typeorm";

import { Products as ProductEntity } from "./entity"

import ErrorHTTP from '../../../lib/error'

export default class Contact implements Interface.ContactDatabase {
  repository: Repository<ProductEntity>;

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(ProductEntity);
  }

  get = async (request: Entities.Product) => {
    try {
      const { id } = request;
      const response = await this.repository.findOneBy({ id });

      if (!response)
        throw new ErrorHTTP({ message: `Product not Found with id: ${id}`, code: 404 })

      return response;
    } catch (err) {
      throw err
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

  create = async (request: Entities.Product) => {
    const response = await this.repository.save(request);

    return response;
  }

  update = async (request: Entities.Product) => {
    try {
      const response = await this.repository.update(request.id, request);

      if (response.affected == 0)
        throw new Error("Affected 0 rows.")

      const user = await this.get(request);
      return user;
    } catch (err) {
      throw new Error("Can't update Product.")
    }
  }

  delete = async (id: string) => {
    try {
      await this.repository
        .createQueryBuilder()
        .softDelete()
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
