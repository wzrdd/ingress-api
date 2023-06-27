import { hash, compare } from "bcrypt";
import ErrorHTTP from "../../../lib/error";

export default class Auth implements Interface.AuthService {
  saltRounds: number;

  constructor(private readonly database: Interface.Postgres) {
    this.saltRounds = 10;
  }

  signIn = async (email: string, password: string) => {
    try {
      const user = await this.database.user.getWithPassword({ email });

      if (!user)
        throw new Error("Can't find user.")

      if (!user.password)
        throw new Error("Not registered password.")

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch)
        throw new Error("Password not match.")

      const token = await hash(`${password}${new Date()}`, this.saltRounds);

      const response = await this.database.auth.create({
        userId: user.id,
        token
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  validateToken = async (token: string) => {
    try {
      const t = await this.database.auth.get({ token: token });

      if (!t)
        throw new Error("Token not valid.")

      const user = await this.database.user.get({ id: t.userId });
      // TODO add roles too

      return { message: "OK", code: 200, user };
    } catch (err) {
      throw new ErrorHTTP({ message: "Unauthorized", code: 401 });
    }
  }

  deleteToken = async (token: string) => {
    try {
      const response = await this.database.auth.delete({ token: token });

      if (response === false)
        throw new Error("Cannot delete token.")

      return response;
    } catch (err) {
      throw err;
    }
  }

  changePassword = async (id: string, oldPassword: string, newPassword: string) => {
    try {
      const user = await this.database.user.getWithPassword({ id: id })

      if (!user)
        throw new Error("User not found.")

      const comparePassword = await compare(oldPassword, user.password);

      if (!comparePassword)
        throw new Error("Password don't match");

      user.password = await hash(newPassword, this.saltRounds)
      await this.database.user.update(user);

      return true;
    } catch (err) {
      throw new err;
    }
  }
}
