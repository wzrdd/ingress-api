declare namespace Interface {
  export interface Services {
    user: Interface.UserService
    auth: Interface.AuthService
  }

  export interface Postgres {
    user: Interface.UserDatabase
    auth: Interface.AuthDatabase
  }
}
