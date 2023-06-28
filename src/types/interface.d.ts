declare namespace Interface {
  export interface Services {
    user: Interface.UserService
    auth: Interface.AuthService
    contact: Interface.ContactService
    product: Interface.ProductService
    role: Interface.Role
    arrival: Interface.ArrivalService
    supplier: Interface.SupplierService
  }

  export interface Postgres {
    user: Interface.UserDatabase
    auth: Interface.AuthDatabase
    contact: Interface.ContactDatabase
    product: Interface.ProductDatabase
    role: Interface.Role
    arrival: Interface.ArrivalDatabase
    supplier: Interface.SupplierDatabase
  }
}
