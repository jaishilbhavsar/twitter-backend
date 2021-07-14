import { JWTService } from './jwt.service';
import { PAYLOADModal } from './../modal/payload.modal';
import { USERModal } from './../modal/user.modal';
import { EntityManager, getManager } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    public tableName = "USER";
    constructor(private manager: EntityManager, private jwtservice: JWTService) {
        this.manager = getManager();
    }
    public async login(data: USERModal): Promise<any> {
        try {

            let sql = "select * from " + this.tableName + " where userName='" + data.userName + "' AND password='" + data.password + "';"
            let result = null;
            let response = await this.manager.query(sql);
            if (response.length > 0) {
                const payload: PAYLOADModal = {
                    userID: response[0].userID,
                    userName: response[0].userName,
                };
                result = { token: await this.jwtservice.CreateJWTToken(payload), message: "success" };
            }
            else {
                result = { message: "No User Found." }
            }
            return result;
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async signUp(data: USERModal): Promise<any> {
        try {
            let sql = "INSERT INTO " + this.tableName + "(userName,password) VALUES('" + data.userName + "','" + data.password + "')";
            let result = await this.manager.query(sql);
            return result;
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
