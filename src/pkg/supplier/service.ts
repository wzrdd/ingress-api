export default class Supplier implements Interface.SupplierService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.Supplier) => {
    const response = await this.database.supplier.get(request)

    return response
  };

  list = async () => {
    try {
      return await this.database.supplier.list()
    } catch (err) {
      throw err
    }
  };

  create = async (request: Entities.Supplier) => {
    const response = await this.database.supplier.create(request)

    return response
  }

  update = async (request: Entities.Supplier) => {
    try {
      const response = await this.database.supplier.update(request)

      return response
    } catch (err) {
      throw new Error("Can't update supplier.")
    }
  };

  delete = async (id: string) => {
    try {
      const response = await this.database.supplier.delete(id);

      return response;
    } catch (err) {
      throw Error("Can't delete arrival");
    }
  };
}
