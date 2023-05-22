declare namespace Interface {
  export interface Services {
    user: Interface.UserService
    auth: Interface.AuthService
    contact: Interface.ContactService
  }

  export interface Postgres {
    user: Interface.UserDatabase
    auth: Interface.AuthDatabase
    contact: Interface.ContactDatabase
  }
}
