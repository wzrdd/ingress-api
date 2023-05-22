import User from '../pkg/user/service'
import Auth from '../pkg/auth/service'
import Contact from '../pkg/contact/service'

export default class Services implements Interface.Services {
  user: User;
  auth: Auth;
  contact: Contact

  constructor(
    postgres: Interface.Postgres,
  ) {
    this.user = new User(postgres);
    this.auth = new Auth(postgres);
    this.contact = new Contact(postgres)
  }
}
