import { JsonFragment } from "@ethersproject/abi";
import { promises } from "fs";
import EtherscanApiClient from "./etherscanApiClient";

/**
 * Keeps a disk cache of contract address to ABI. If we've never seen a contract address
 * before, we'll make an API request to Etherscan to obtain the ABI and cache it, so that next time
 * we can return a cached version.
 */
export default class ContractABICache {
  etherscanApiClient: EtherscanApiClient;
  cacheLocation: string;

  constructor() {
    this.cacheLocation = "./cache";
    this.etherscanApiClient = new EtherscanApiClient();
  }

  /** Returns a cached ABI if one exists or instantiates a new one, caches and returns it. */
  async get(address: string): Promise<ReadonlyArray<JsonFragment> | null> {
    const existingAbi = await this.exists(address);
    console.log("PRINTING SHIT " +  existingAbi)
    if (existingAbi) {
      return await this.readCachedFile(address);
    } else {
      return await this.fetchContractAbiIfNotCached(address);
    }
  }

  private async fetchContractAbiIfNotCached(
    address: string
  ): Promise<ReadonlyArray<JsonFragment> | null> {
    const existingAbi = await this.exists(address);
    console.log("PRINTING SHIT " +  existingAbi)
    if (existingAbi) {
      return await this.readCachedFile(address);
    } else {
      const abi = await this.etherscanApiClient.abi(address);
      this.writeCachedFile(address, abi);
      return abi;
    }
  }

  private async writeCachedFile(contractAddress: string, abi: any) {
    console.log("PRINTING SHIT IN write cached file" +  abi)
    const filePath = `${this.cacheLocation}/${contractAddress}.json`;
    console.log("PRINTING SHIT IN write cached file" +  filePath)
    try {
      await promises.writeFile(filePath, JSON.stringify(abi));
      console.log("Wrote ABI to cache file", { filePath });
    } catch (e: any) {
      console.log("Failed to write file to cache", e);
    }
  }

  private async readCachedFile(contractAddress: string): Promise<any> {
    const filePath = `${this.cacheLocation}/${contractAddress}.json`;
    const abi = await promises.readFile(filePath, "utf8");
    return JSON.parse(abi);
  }

  private async exists(contractAddress: string): Promise<boolean> {
    const filePath = `${this.cacheLocation}/${contractAddress}.json`;
    try {
      const stat = await promises.stat(filePath);
      return stat.isFile();
    } catch {
      return false;
    }
  }
}
