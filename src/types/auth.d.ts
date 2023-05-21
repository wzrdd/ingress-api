declare namespace Entities {
  export interface Auth {
    id?: string;
    token?: string;
    userId?: string;

    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
  }
}

declare namespace Interface {
  export interface AuthService {
    signIn: (email: string, password: string) => Promise<Entities.Auth>;
    validateToken: (token: string) => Promise<{ message: string, code: number }>;
    deleteToken: (token: string) => Promise<boolean>;
    changePassword: (
      id: string,
      oldPassword: string,
      newPassword: string
    ) => Promise<boolean>;
  }

  export interface AuthDatabase {
    get: (request: Entities.Auth) => Promise<Entities.Auth>;
    create: (request: Entities.Auth) => Promise<Entities.Auth>;
    delete: (request: Entities.Auth) => Promise<boolean>;
  }
}
