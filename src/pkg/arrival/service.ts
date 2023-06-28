export default class Arrival implements Interface.ArrivalService {
  constructor(private readonly database: Interface.Postgres) {}

  get = async (request: Entities.Arrival) => {
    return await this.database.arrival.get(request)
  }

  list = async (days: number) => {
    try {
      return await this.database.arrival.list(days)
    } catch (err) {
      throw err
    }
  }

  create = async (request: Entities.Arrival) => {
    try {
      return await this.database.arrival.create(request)
    } catch (err) {
      throw err
    }
  }

  update = async (request: Entities.Arrival) => {
    try {
      const response = await this.database.arrival.update(request)

      return response
    } catch (err) {
      throw new Error("Can't update arrival.")
    }
  }

  delete = async (id: string) => {
    try {
      const response = await this.database.arrival.delete(id);

      return response;
    } catch (err) {
      throw Error("Can't delete arrival");
    }
  }
}
