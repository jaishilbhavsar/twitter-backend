import { LIKESModal } from './../modal/likes.modal';
import { TWEETModal } from './../modal/tweet.modal';
import { JWTService } from './../user/jwt.service';
import { EntityManager, getManager } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TweetService {
    public tableName = "TWEET";
    public likesTable = "LIKES";
    constructor(private manager: EntityManager, private jwtservice: JWTService) {
        this.manager = getManager();
    }
    public async getAllTweets(): Promise<any> {
        try {
            let sql = "SELECT * FROM " + this.tableName + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async createTweet(data: TWEETModal): Promise<any> {
        try {
            let date = new Date();
            let dateTime = date.toISOString().split("T")[0] + " " + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
            let sql = "INSERT INTO " + this.tableName + " (userID,tweetMessage,tweetDate) VALUES(" + data.userID + ",'" + data.tweetMessage + "','" + dateTime + "');"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async updateTweet(data: TWEETModal): Promise<any> {
        try {
            let date = new Date();
            let dateTime = date.toISOString().split("T")[0] + " " + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
            let sql = "UPDATE " + this.tableName + " SET tweetMessage='" + data.tweetMessage + "',tweetDate='" + dateTime + "' WHERE tweetID=" + data.tweetID + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async deleteTweet(id: Number): Promise<any> {
        try {
            let sql = "DELETE FROM " + this.tableName + " WHERE tweetID=" + id + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async getAllLikesByTweetID(id: Number): Promise<any> {
        try {
            let sql = "SELECT * FROM " + this.likesTable + " WHERE tweetID=" + id + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async likeTweet(data: LIKESModal): Promise<any> {
        try {
            let sql = "INSERT INTO " + this.likesTable + " (tweetID,userID) VALUES(" + data.tweetID + "," + data.userID + ");";
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async unlikeTweet(id: Number): Promise<any> {
        try {
            let sql = "DELETE FROM " + this.likesTable + " WHERE likesID=" + id + ";"
            return await this.manager.query(sql);
        }
        catch (er) {
            throw new HttpException(er.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
