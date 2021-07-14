import { DIRECTMESSAGEModal } from './../modal/directmessage.modal';
import { DirectmessageService } from './directmessage.service';
import { Controller, Get, Req, Post, Body } from '@nestjs/common';

@Controller('directmessage')
export class DirectmessageController {
    constructor(public directmessageService: DirectmessageService) {
    }

    @Get('getAllDirectMessages')
    public async getAllDirectMessages(@Req() req): Promise<any> {
        return await this.directmessageService.getAllDirectMessages();
    }
    @Post('sendMessage')
    public async sendMessage(@Req() req, @Body() data: DIRECTMESSAGEModal): Promise<any> {
        return await this.directmessageService.sendMessage(data);
    }
}
