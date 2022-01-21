export const enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  INTERNAL_ERROR = 500,
}

export interface IFormatResponse {
  status: number;
  message?: string;
  data?: any;
}

// {
// 	"sub": "109778343979278561620",
// 	"name": "郭柏逸",
// 	"given_name": "柏逸",
// 	"family_name": "郭",
// 	"picture": "https://lh3.googleusercontent.com/a-/AOh14Gj1pRsioY885EAuIBEEV5Q56s6lPyl-zvvyr7hLmN8=s96-c",
// 	"email": "b3589481400@gmail.com",
// 	"email_verified": true,
// 	"locale": "zh-TW"
// }
export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface JwtPayload {
  accessToken: string;
  id: string;
  name: string;
  email: string;
  exp: number;
  iat?: number;
}
