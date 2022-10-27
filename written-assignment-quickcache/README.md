# Interview Written Assignment - QuickCache

## Overview

At QuickNode, we value passion, progress, humility, trust and excellence. For the first part of our
interview process, we'll have you write up a short analysis of the codebase for this thin cache around the
[Etherscan API](https://docs.etherscan.io/api-endpoints/contracts). There is no coding necessary and
we in fact do not need you to write any code for this exercise, just tell us what the problems you
find are and how you figured them out using written communication.

What we're selecting for at this step is clarity of thought, written communication ability and humility.
How clear is your writing? What are the items that you consider when working through a bug? Are you
willing to invest the time necessary to help us understand your abilities?

> Note: It's important to note that we will not use your work here for anything other than evaluation.
> This piece of code will be used exclusively for this assessment and nowhere else.

We would like for you to take 15-20 minutes to review this repository as it stands and 40-45 minutes
to write up a short description of your impressions and any problems you found and how you figured
out those were the problems. There is not much to consider and we want to hear every idea you had
and how you arrived at your conclusions.

Without further ado, here is the repo as it would be provided to you by one of our developers:

## QuickCache: A tool for caching smart contract ABIs

At QuickNode we need to obtain the ABI of verified smart contracts on the Ethereum blockchain for
interacting with them.

We're using the Etherscan API for that and we placed a thin cache in front of it to avoid making
unnecessary calls.

This cache needs to be highly available, fast and reliable since it needs to be accessed concurrently
from multiple workers and in a distributed fashion.

One of your colleagues prototyped this yesterday and we are planning to operationalize and ship it
to production in a few days. We need you to identify any potential issues, bugs and risks associated
with it before we ship it.

## Building and running the project

Requires Node v16 or newer.
Replace `ETHERSCAN_API_KEY` with your Etherscan API key.

```bash
yarn install
yarn build
node src/index.js
```
