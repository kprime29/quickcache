import ContractABICache from "./contractAbiCache";

(async function () {
  const address = "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb";
  const contractAbiCache = new ContractABICache();
  const abi = await contractAbiCache.get(address);
  console.log(abi);
})();
