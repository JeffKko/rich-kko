import { sign, verify } from 'jsonwebtoken';

// export class JwtService {
//   private secret = process.env.JWT_SIGN as string;

//   public sign(payload: any) {
//     return new Promise<string>((resolve, reject) => {
//       sign(payload, this.secret, {}, (err: Error, encoded: string) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(encoded);
//         }
//       });
//     });
//   }

//   public verify<T extends string | object>(jwt: string) {
//     return new Promise<T>((resolve, reject) => {
//       verify(jwt, this.secret, (err, decoded) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(<T>decoded);
//         }
//       });
//     });
//   }
// }
