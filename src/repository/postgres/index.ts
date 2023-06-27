import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Users } from "../../pkg/user/entity"
import { Auths } from "../../pkg/auth/entity"
import { Contacts } from "../../pkg/contact/entity"
import { Products } from '../../pkg/product/entity'
import { Roles } from '../../pkg/roles/entity'

import User from "../../pkg/user/repository"
import Auth from "../../pkg/auth/repository"
import Contact from "../../pkg/contact/repository"
import Product from "../../pkg/product/repository"
import Role from '../../pkg/roles/repository'

export default class Postgres implements Interface.Postgres {
  user: Interface.UserDatabase
  auth: Interface.AuthDatabase
  contact: Interface.ContactDatabase
  product: Interface.ProductDatabase
  role: Interface.Role

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
          Contacts,
          Products,
          Roles
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
      this.product = new Product(conn)
      this.role = new Role(conn)
    } catch (err) {
      throw err
    }
  }

}
