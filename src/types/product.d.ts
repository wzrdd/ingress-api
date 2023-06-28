declare namespace Entities {
  export interface Product {
    id?: string
    name?: string
    quantityUnit?: string
    quantityValue?: number
    productType?: string
    quantityValueAlert?: number
    // TODO This is expected to be a JSON/BSON. This would be JSON if postgres is used
    // and BSON if Mongo is implemented. The mongo implementation is waiting if really needed.
    //
    // Product types should be:
    // - Raw Material: The simplest one, should not add many fields.
    // - Consumable: Should include an expire date or a finer quantity description.
    // - Unfinished product: From here start to get tricky. This could be an internal unfinished good
    //                    but also can be a supplier unfinished good and can be added an arrival date.
    // - Finished product: This should add a "Components" field that specify the raw materials, consumalbes
    //                     and unfinished products required to build this.
    //
    // This is a string that contains a JSON. Forgive me Father for I have sinned.
    description?: string
  }
}

declare namespace Interface {
  export interface ProductService {
    get: (request: Entities.Product) => Promise<Entities.Product>
    list: () => Promise<Entities.Contact[]>
    create: (request: Entities.Product) => Promise<Entities.Product>
    update: (request: Entities.Product) => Promise<Entities.Product>
    delete: (id: string) => Promise<boolean>
  }

  export interface ProductDatabase {
    get: (request: Entities.Product) => Promise<Entities.Product>
    list: () => Promise<Entities.Product[]>
    create: (request: Entities.Product) => Promise<Entities.Product>
    update: (request: Entities.Product) => Promise<Entities.Product>
    delete: (id: string) => Promise<boolean>
  }
}
