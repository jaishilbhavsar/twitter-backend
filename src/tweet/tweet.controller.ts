import { TWEETModal } from './../modal/tweet.modal';
import { TweetService } from './tweet.service';
import { Controller, Post, Req, Body, Delete, Param, Get } from '@nestjs/common';

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {

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
}
