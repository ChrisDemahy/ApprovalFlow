declare module namespace {
  export interface User {
    id: number;
    email: string;
    token: string;
  }

  export interface RootObject {
    user: User;
  }
}
