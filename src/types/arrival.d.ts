declare namespace Entities {
  export interface Arrival {
    id?: string
    entryDate?: Date
    productId?: string[]
    supplierId?: string
    aditionalNotes?: string
  }
}

declare namespace Interface {
  export interface ArrivalService {
    get: (request: Entities.Arrival) => Promise<Entities.Arrival>
    list: (days: number) => Promise<Entities.Arrival[]>
    create: (request: Entities.Arrival) => Promise<Entities.Arrival>
    update: (request: Entities.Arrival) => Promise<Entities.Arrival>
    delete: (userId: string) => Promise<boolean>
  }

  export interface ArrivalDatabase {
    get: (request: Entities.Arrival) => Promise<Entities.Arrival>
    list: (days: number) => Promise<Entities.Arrival[]>
    create: (request: Entities.Arrival) => Promise<Entities.Arrival>
    update: (request: Entities.Arrival) => Promise<Entities.Arrival>
    delete: (userId: string) => Promise<boolean>
  }
}
