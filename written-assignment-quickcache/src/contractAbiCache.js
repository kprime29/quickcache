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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const etherscanApiClient_1 = __importDefault(require("./etherscanApiClient"));
/**
 * Keeps a disk cache of contract address to ABI. If we've never seen a contract address
 * before, we'll make an API request to Etherscan to obtain the ABI and cache it, so that next time
 * we can return a cached version.
 */
class ContractABICache {
    constructor() {
        this.cacheLocation = "./cache";
        this.etherscanApiClient = new etherscanApiClient_1.default();
    }
    /** Returns a cached ABI if one exists or instantiates a new one, caches and returns it. */
    get(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAbi = yield this.exists(address);
            console.log("PRINTING SHIT " + existingAbi);
            if (existingAbi) {
                return yield this.readCachedFile(address);
            }
            else {
                return yield this.fetchContractAbiIfNotCached(address);
            }
        });
    }
    fetchContractAbiIfNotCached(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAbi = yield this.exists(address);
            console.log("PRINTING SHIT " + existingAbi);
            if (existingAbi) {
                return yield this.readCachedFile(address);
            }
            else {
                const abi = yield this.etherscanApiClient.abi(address);
                this.writeCachedFile(address, abi);
                return abi;
            }
        });
    }
    writeCachedFile(contractAddress, abi) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PRINTING SHIT IN write cached file" + abi);
            const filePath = `${this.cacheLocation}/${contractAddress}.json`;
            console.log("PRINTING SHIT IN write cached file" + filePath);
            try {
                yield fs_1.promises.writeFile(filePath, JSON.stringify(abi));
                console.log("Wrote ABI to cache file", { filePath });
            }
            catch (e) {
                console.log("Failed to write file to cache", e);
            }
        });
    }
    readCachedFile(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = `${this.cacheLocation}/${contractAddress}.json`;
            const abi = yield fs_1.promises.readFile(filePath, "utf8");
            return JSON.parse(abi);
        });
    }
    exists(contractAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = `${this.cacheLocation}/${contractAddress}.json`;
            try {
                const stat = yield fs_1.promises.stat(filePath);
                return stat.isFile();
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.default = ContractABICache;
