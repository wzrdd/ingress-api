export default class Arrival implements Interface.ArrivalService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.Arrival) => {
    const response = await this.database.arrival.get(request)

    return response
  };

  list = async () => {
    try {
      return await this.database.arrival.list()
    } catch (err) {
      throw err
    }
  };

  create = async (request: Entities.Arrival) => {
    const response = await this.database.arrival.create(request)

    return response
  }

  update = async (request: Entities.Arrival) => {
    try {
      const response = await this.database.arrival.update(request)

      return response
    } catch (err) {
      throw new Error("Can't update arrival.")
    }
  };

  delete = async (id: string) => {
    try {
      const response = await this.database.arrival.delete(id);

      return response;
    } catch (err) {
      throw Error("Can't delete arrival");
    }
  };
}
