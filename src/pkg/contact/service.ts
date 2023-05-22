export default class Contact implements Interface.ContactService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.Contact) => {
    const response = await this.database.contact.get(request);

    return response;
  };

  list = async () => {
    try {
      return await this.database.contact.list();
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.Contact) => {
    const response = await this.database.contact.create(request);

    return response;
  };

  update = async (request: Entities.Contact) => {
    try {
      const response = await this.database.contact.update(request)

      return response
    } catch (err) {
      throw new Error("Can't update contact.")
    }
  };

  delete = async (id: string) => {
    try {
      const response = await this.database.contact.delete(id);

      return response;
    } catch (err) {
      throw Error("Can't delete contact");
    }
  };
}
