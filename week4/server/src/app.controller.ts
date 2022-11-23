import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

export class RequestTokensDto {
  toAddress: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-address')
  getTokenAddress(): contractData[] {
    return this.appService.getContractsData();
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto): Promise<void> {
    return this.appService.requestTokens(body.toAddress);
  }
}
