import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

export class RequestTokensDto {
  toAddress: string;
  amount: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-address')
  getTokenAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto): Promise<void> {
    console.log('body: ', body);
    return this.appService.requestTokens(body.toAddress, body.amount);
  }
}
