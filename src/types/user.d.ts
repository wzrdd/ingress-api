declare namespace Entities {
  export interface User {
    id?: string
    name?: string
    lastName?: string
    rut?: string
    email?: string
    phone?: string
    password?: string
    role?: string
  }
}

declare namespace Interface {
  export interface UserService {
    get: (request: Entities.User) => Promise<Entities.User>
    getWithPassword: (request: Entities.User) => Promise<Entities.User>
    list: (request: Entities.User) => Promise<Entities.User[]>
    create: (request: Entities.User) => Promise<Entities.User>
    createAdmin: (request: Entities.User) => Promise<Entities.User>
    update: (request: Entities.User) => Promise<Entities.User>
    delete: (userId: string) => Promise<boolean>
  }

  export interface UserDatabase {
    get: (request: Entities.User) => Promise<Entities.User>
    getWithPassword: (request: Entities.User) => Promise<Entities.User>
    list: (request: Entities.User) => Promise<Entities.User[]>
    create: (request: Entities.User) => Promise<Entities.User>
    update: (request: Entities.User) => Promise<Entities.User>
    delete: (userId: string) => Promise<boolean>
  }
}
