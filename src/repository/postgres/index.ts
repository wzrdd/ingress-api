import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Users } from "../../pkg/user/entity"
import { Auths } from "../../pkg/auth/entity"
import { Contacts } from "../../pkg/contact/entity"

import User from "../../pkg/user/repository"
import Auth from "../../pkg/auth/repository"
import Contact from "../../pkg/contact/repository";

export default class Postgres implements Interface.Postgres {
  user: Interface.UserDatabase
  auth: Interface.AuthDatabase
  contact: Interface.ContactDatabase
  conn: DataSource

  constructor(
    private host: string,
    private port: number,
    private username: string,
    private password: string,
    private database: string
  ) {}

  init = async () => {
    try {
      const conn = new DataSource({
        type: "postgres",
        host: this.host,
        port: this.port,
        username: this.username,
        password: this.password,
        database: this.database,
        entities: [
          Users,
          Auths,
          Contacts
        ],
        logging: false,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      })

      if (!conn)
        throw new Error("Connection undefined")

      this.conn = conn
      await conn.initialize()

      this.user = new User(conn)
      this.auth = new Auth(conn)
      this.contact = new Contact(conn)

    } catch (err) {
      throw err
    }
  }

}
