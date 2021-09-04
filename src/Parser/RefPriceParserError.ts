import { CustomError } from "ts-custom-error";

export class RefPriceParserError extends CustomError {
  constructor(
    public pattern: string,
    public content: string,
    message = "Failed parsing reference price"
  ) {
    super(message);
  }
}
