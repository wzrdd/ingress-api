import User from '../pkg/user/service'
import Auth from '../pkg/auth/service'
import Contact from '../pkg/contact/service'
import Product from '../pkg/product/service'
import Role from '../pkg/roles/service'
import Arrival from '../pkg/arrival/service'

export default class Services implements Interface.Services {
  user: User
  auth: Auth
  contact: Contact
  product: Product
  role: Role
  arrival: Arrival

  constructor(
    postgres: Interface.Postgres,
  ) {
    this.user = new User(postgres);
    this.auth = new Auth(postgres);
    this.contact = new Contact(postgres)
    this.product = new Product(postgres)
    this.role = new Role(postgres)
    this.arrival = new Arrival(postgres)
  }
}
