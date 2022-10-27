"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const providers_1 = require("@ethersproject/providers");
/** Returns a smart contract ABI */
class EtherscanApiClient {
    constructor() {
        this.etherscanProvider = new providers_1.EtherscanProvider({ name: "homestead", chainId: 1 }, "GDGKBZIQBUS5KX965GQRJTR4WW7ZGZTYR2");
    }
    abi(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching Etherscan contract ABI for address=" + contractAddress);
            const contract = yield this.etherscanProvider.fetch("contract", {
                action: "getabi",
                address: contractAddress,
            });
            return JSON.parse(contract);
        });
    }
}
exports.default = EtherscanApiClient;
