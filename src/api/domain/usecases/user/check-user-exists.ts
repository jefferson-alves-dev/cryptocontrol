export interface ICheckUserExists {
  checkByEmail(email: string): Promise<TCheckUserExists.Result>
}

export namespace TCheckUserExists {
  export type Result = boolean
}
