QuickCache: A tool for caching smart contract ABIs

Obtain the ABI of verified smart contracts on the Ethereum blockchain for interacting with them using quicknode's rpc.

We're using the Etherscan API here and placed a thin cache in front of it to avoid making unnecessary calls.

This cache needs to be highly available, fast and reliable since it needs to be accessed concurrently
from multiple workers and in a distributed fashion.

## Building and running the project

Requires Node v16 or newer.
Replace `ETHERSCAN_API_KEY` with your Etherscan API key.

```bash
yarn install
yarn build
node src/index.js
```
