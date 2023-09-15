export namespace TAuth {
  export type Login = {
    email: string
    password: string
  }

  export type Singup = {
    name: string
    email: string
    password: string
  }

  export type Logout = {
    userId: string
  }
}
