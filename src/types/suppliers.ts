declare namespace Entities {
  export interface Supplier {
    id?: string
    name?: string
    email?: string
    phone?: string
  }
}

declare namespace Interface {
  export interface SupplierService {
    get: (request: Entities.Supplier) => Promise<Entities.Supplier>
    list: () => Promise<Entities.Supplier[]>
    create: (request: Entities.Supplier) => Promise<Entities.Supplier>
    update: (request: Entities.Supplier) => Promise<Entities.Supplier>
    delete: (userId: string) => Promise<boolean>
  }

  export interface SupplierDatabase {
    get: (request: Entities.Supplier) => Promise<Entities.Supplier>
    list: () => Promise<Entities.Supplier[]>
    create: (request: Entities.Supplier) => Promise<Entities.Supplier>
    update: (request: Entities.Supplier) => Promise<Entities.Supplier>
    delete: (userId: string) => Promise<boolean>
  }
}
