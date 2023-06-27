declare namespace Entities {
  interface Role {
    id?: string;
    name?: string;
  }
}

declare namespace Interface {
  export interface Role {
    list: () => Promise<Entities.Role[]>;
    create: (request: Entities.Role) => Promise<Entities.Role>;
  }
}
