import User from '../pkg/user/service'
import Auth from '../pkg/auth/service'

export default class Services implements Interface.Services {
  user: User;
  auth: Auth;

  constructor(
    postgres: Interface.Postgres,
  ) {
    this.user = new User(postgres);
    this.auth = new Auth(postgres);
  }
}
