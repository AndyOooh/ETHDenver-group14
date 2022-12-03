import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AppService} from './app.service';

export class RequestTokensDto {
  toAddress: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Week4
  @Get('contract-data/:contract')
  // getContractsData(@Param('contract') contract: string): contractData[] | contractData {
  getContractsData(@Param('contract') contract: string) {
    return this.appService.getContractsData(contract);
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto): Promise<void> {
    return this.appService.requestWEEK4(body.toAddress);
  }
}
