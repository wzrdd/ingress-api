export default class Product implements Interface.ProductService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.Product) => {
    const response = await this.database.product.get(request);

    return response;
  };

  list = async () => {
    try {
      return await this.database.product.list();
    } catch (err) {
      throw err;
    }
  };

  create = async (request: Entities.Product) => {
    const response = await this.database.product.create(request);

    return response;
  };

  update = async (request: Entities.Product) => {
    try {
      const response = await this.database.product.update(request)

      return response
    } catch (err) {
      throw new Error("Can't update product.")
    }
  };

  delete = async (id: string) => {
    try {
      const response = await this.database.product.delete(id);

      return response;
    } catch (err) {
      throw Error("Can't delete product");
    }
  };
}
