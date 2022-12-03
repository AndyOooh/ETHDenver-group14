"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var ethers_1 = require("ethers");
var tokenJson = require("../assets/week4/MyToken.json");
var ER20Constants_1 = require("../assets/week4/ER20Constants");
var tokenBallotConstants_1 = require("../assets/week4/tokenBallotConstants");
var lotteryConstants_1 = require("../assets/week5/lotteryConstants");
var LOTConstants_1 = require("../assets/week5/LOTConstants");
var AppService = /** @class */ (function () {
    function AppService() {
        this.provider = new ethers_1.ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
        var signer = new ethers_1.ethers.Wallet(process.env.METAMASK_PK, this.provider);
        // this.provider = ethers.getDefaultProvider('goerli');
        // this.provider = ethers.getDefaultProvider('http://localhost:8545');
        // const signer = this.provider.getSigner();
        // const signer = ethers.Wallet.createRandom().connect(this.provider);
        this.erc20ContractFactory = new ethers_1.ethers.ContractFactory(tokenJson.abi, tokenJson.bytecode, signer);
        // this.erc20Contract = erc20ContractFactory.attach(erc20_contract_address);
        this.erc20Contract = new ethers_1.ethers.Contract(ER20Constants_1.erc20Data.address, ER20Constants_1.erc20Data.abi, signer);
    }
    // Global/util
    AppService.prototype.getContractsData = function (contractName) {
        if (contractName === 'Ballot') {
            return [ER20Constants_1.erc20Data, tokenBallotConstants_1.tokenBallotData];
        }
        else if (contractName === 'Lottery') {
            return [lotteryConstants_1.lotteryData, LOTConstants_1.LOTData];
        }
    };
    // Week 4
    AppService.prototype.requestWEEK4 = function (toAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, amountWei, mintTx, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = '2';
                        amountWei = ethers_1.ethers.utils.parseEther(amount);
                        console.log('Requesting to mint...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.erc20Contract.mint(toAddress, amountWei)];
                    case 2:
                        mintTx = _a.sent();
                        return [4 /*yield*/, mintTx.wait()];
                    case 3:
                        _a.sent();
                        console.log('🚀 ~ file: app.service.ts ~ line 42 ~ mintTx', mintTx);
                        console.log("Minted ".concat(amount, " decimal units to account ").concat(toAddress));
                        return [2 /*return*/];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error(err_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AppService = __decorate([
        (0, common_1.Injectable)()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
