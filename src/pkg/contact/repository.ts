import { DataSource, Repository } from "typeorm";

import { Contacts as ContactEntity } from "./entity"

import ErrorHTTP from '../../../lib/error'

export default class Contact implements Interface.ContactDatabase {
  repository: Repository<ContactEntity>;

  constructor(conn: DataSource) {
    this.repository = conn.getRepository(ContactEntity);
  }

  get = async (request: Entities.Contact) => {
    try {
      const { id } = request;
      const response = await this.repository.findOneBy({ id });

      if (!response)
        throw new ErrorHTTP({ message: `Contact Not Found with id: ${id}`, code: 404 })

      return response;
    } catch (err) {
      throw err
    }
  };

  // TODO add filter
  list = async () => {
    try {
      const response = await this.repository.find();

      return response;
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.Contact) => {
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

  delete = async (userId: string) => {
    try {
      await this.repository
        .createQueryBuilder()
        .delete()
        .where({ id: userId })
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
