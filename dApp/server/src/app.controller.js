"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppController = exports.RequestTokensDto = void 0;
var common_1 = require("@nestjs/common");
var RequestTokensDto = /** @class */ (function () {
    function RequestTokensDto() {
    }
    return RequestTokensDto;
}());
exports.RequestTokensDto = RequestTokensDto;
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    // Week4
    // getContractsData(@Param('contract') contract: string): contractData[] | contractData {
    AppController.prototype.getContractsData = function (contract) {
        return this.appService.getContractsData(contract);
    };
    AppController.prototype.requestTokens = function (body) {
        return this.appService.requestWEEK4(body.toAddress);
    };
    __decorate([
        (0, common_1.Get)('contract-data/:contract')
        // getContractsData(@Param('contract') contract: string): contractData[] | contractData {
        ,
        __param(0, (0, common_1.Param)('contract'))
    ], AppController.prototype, "getContractsData");
    __decorate([
        (0, common_1.Post)('request-tokens'),
        __param(0, (0, common_1.Body)())
    ], AppController.prototype, "requestTokens");
    AppController = __decorate([
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
