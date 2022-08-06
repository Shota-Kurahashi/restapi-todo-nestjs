//!serviceで使う型を設定する

export interface Msg {
  message: string;
}
export interface Csrf {
  csrfToken: string;
}
export interface Jwt {
  accessToken: string;
}
