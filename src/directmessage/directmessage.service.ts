import { DIRECTMESSAGEModal } from './../modal/directmessage.modal';
import { JWTService } from './../user/jwt.service';
import { EntityManager, getManager } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DirectmessageService {
    public tableName = "DIRECTMESSAGE";
    constructor(private manager: EntityManager, private jwtservice: JWTService) {
        this.manager = getManager();
    }
    public async getAllDirectMessages(): Promise<any> {
        try {
            let sql = "SELECT * FROM " + this.tableName + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async sendMessage(data: DIRECTMESSAGEModal): Promise<any> {
        try {
            let date = new Date();
            let dateTime = date.toISOString().split("T")[0] + " " + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
            let sql = "INSERT INTO " + this.tableName + " (senderUserID,receiverUserID,message,messageDate) VALUES(" + data.senderUserID + "," + data.receiverUserID + ",'" + data.message + "','" + dateTime + "');"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
