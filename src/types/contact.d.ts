declare namespace Entities {
  export interface Contact {
    id?: string
    email?: string
    message?: string
    // TODO this should be a bool, enum or a string?
    status?: string
  }
}

declare namespace Interface {
  export interface ContactService {
    get: (request: Entities.Contact) => Promise<Entities.Contact>
    // TODO: list should get a filter with the status or email
    list: () => Promise<Entities.Contact[]>
    create: (request: Entities.Contact) => Promise<Entities.Contact>
    update: (request: Entities.Contact) => Promise<Entities.Contact>
    delete: (userId: string) => Promise<boolean>
  }

  export interface ContactDatabase {
    get: (request: Entities.Contact) => Promise<Entities.Contact>
    list: () => Promise<Entities.Contact[]>
    create: (request: Entities.Contact) => Promise<Entities.Contact>
    update: (request: Entities.Contact) => Promise<Entities.Contact>
    delete: (userId: string) => Promise<boolean>
  }
}
