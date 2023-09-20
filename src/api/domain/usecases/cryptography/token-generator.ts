export interface ITokenGenerator {
  generate(
    payload: TTokenGenerator.Payload,
    secret: TTokenGenerator.Secret,
    expiresIn: TTokenGenerator.ExpiresIn,
  ): Promise<TTokenGenerator.Result>
}

export namespace TTokenGenerator {
  export type Payload = { [key: string]: any }
  export type Secret = string
  export type Result = string
  export type ExpiresIn = string | number
}
