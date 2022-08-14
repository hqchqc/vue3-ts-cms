export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export interface ILoginResult {
  id: number
  token: string
  name: string
}

// export interface IUserInfo {
//   id: number
//   name: string
//   realname: string
// }

export interface IDataType<T = any> {
  code: number
  data: T
}
