import { JWTService } from './../user/jwt.service';
import { LIKESModal } from './../modal/likes.modal';
import { TWEETModal } from './../modal/tweet.modal';
import { TweetService } from './tweet.service';
import { Controller, Post, Req, Body, Delete, Param, Get } from '@nestjs/common';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService, public JWTService: JWTService) {

    }
    @Get('getAllTweets')
    public async getAllTweets(@Req() req): Promise<any> {
        return await this.tweetService.getAllTweets();
    }
    @Post('createTweet')
    public async createTweet(@Req() req, @Body() data: TWEETModal): Promise<any> {
        return await this.tweetService.createTweet(data);
    }
    @Post('updateTweet')
    public async updateTweet(@Req() req, @Body() data: TWEETModal): Promise<any> {
        return await this.tweetService.updateTweet(data);
    }
    @Delete('deleteTweet/:id')
    public async deleteTweet(@Req() req, @Param('id') id: Number): Promise<any> {
        return await this.tweetService.deleteTweet(id);
    }
    @Get('getAllLikesByTweetID/:id')
    public async getAllLikesByTweetID(@Req() req, @Param('id') id: number): Promise<any> {
        let decoded = this.JWTService.decodeJWTToken(req.headers.authorization.split(" ")[1]);
        if (decoded.status == true) {
            return await this.tweetService.getAllLikesByTweetID(id);
        }
        else {
            return { message: "You are not authorized.Please login." }
        }
    }
    @Post('likeTweet')
    public async likeTweet(@Req() req, @Body() data: LIKESModal): Promise<any> {
        return await this.tweetService.likeTweet(data);
    }
    @Delete('unlikeTweet/:id')
    public async unlikeTweet(@Req() req, @Param('id') id: Number): Promise<any> {
        return await this.tweetService.unlikeTweet(id);
    }
}
