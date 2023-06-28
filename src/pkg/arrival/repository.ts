import { DataSource, Repository } from "typeorm";

import { Arrivals as ArrivalEntity } from "./entity"

import ErrorHTTP from '../../../lib/error'

export default class Arrival implements Interface.ArrivalDatabase {
  repository: Repository<ArrivalEntity>;

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(ArrivalEntity);
  }

  get = async (request: Entities.Arrival) => {
    try {
      const { id } = request;
      const response = await this.repository.findOneBy({ id });

      if (!response)
        throw new ErrorHTTP({ message: `Arrival not Found with id: ${id}`, code: 404 })

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

  create = async (request: Entities.Arrival) => {
    const response = await this.repository.save(request);

    return response;
  }

  update = async (request: Entities.Arrival) => {
    try {
      const response = await this.repository.update(request.id, request);

      if (response.affected == 0)
        throw new Error("Affected 0 rows.")

      return await this.get(request);
    } catch (err) {
      throw new Error("Can't update arrival.")
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
