export default class ErrorHTTP {
  message: string;
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    this.message = message;
    this.code = code;
  }
}
