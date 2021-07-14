import { PAYLOADModal } from './../modal/payload.modal';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTService {

    public CreateJWTToken(Payload: PAYLOADModal): string {
        const SignInOptions = {
            expiresIn: process.env.JWT_EXPIRE,
            algorithm: process.env.JWT_ALGORITHM,
        };
        const token = jwt.sign(Payload, String(process.env.JWT_SECRET), SignInOptions);
        return token;
    }

    public decodeJWTToken(token: string): any {
        try {
            var decoded = jwt.verify(token, String(process.env.JWT_SECRET));
            return {
                status: true,
                payload: decoded
            }
        } catch (err) {
            console.log(err);
            return {
                status: false,
                payload: null
            }
        }
    }
}
