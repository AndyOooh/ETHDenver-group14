<h1 align="center">ETHDenver boot camp Nov 24 2022 cohort</h1>
<h4 align="center">Group 14</h4>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

# Projects

- [Week1](GroupProjects/Week1.md) 


# Setup
- Install the dependencies via npm
- Use node version 16 or 18

# Testing

`npm run test`

# Linting
- Lint TS/JS files: `npm run lint:ts`
- Lint fix TS/JS files: `npm run lint:ts:fix`
- Lint fix Solidity files: `npm run lint:sol`

# Deploying with Hardhat

1. Add the env variables as specified in the example file
2. `npm run deploy` to deploy to goerli

# Transactions

## helloWorld:setText
1. change the args passed to `setText` in `scripts/transactions/setText.ts`
2. `npm run helloWorld:setText`
