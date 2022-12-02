## Instructions
- Implementing the relatively safe randomness source from prevrandao
- Implementing the time lock using block timestamp
- Block time estimation
- Implementing the fee
- (Review) Dealing with decimals
- Withdrawing from pool and redeeming eth
- (Bonus) "Normal" factory pattern and clone pattern overview
- **Build a frontend for the Lottery dApp**

## Report

- Lottery contract and LOT token contract created:
    - Lottery: https://goerli.etherscan.io/address/0x5f539341e79732b32c1dbc9dab6f04c309b60995
    - LOT: https://goerli.etherscan.io/address/0xc53F7aD52016Fe14719D5Af5F6f29Ca65F165fe7
    - tx hash: `0xc8684c983c8db961057ef4d06fedf223279c803a33df21fa45c48e092d60d6c5`
    - with constructor args
        - tokenName: Lottery
        - tokenSymbol: LOT
        - _purchaseRatio: 10000
        - _betPrice: 1
        - _betFee: 0.2

- Bets opened by 0x339188f7d0eb2d80dcacf40a9432093201a61d99:
    - tx hash: 0x04c1501ca949cdcfa31f967b6f6cf527b585c669222ed4bdcdc65cdf78c2e2e9

Player 1: 0x339188f7d0eb2d80dcacf40a9432093201a61d99

Player 2: 0x63c50ef2810eef47b814ca019f2f7add53e10a1b

Players have purchased LOT, bet, bet many, checked winnings, attempted to withdraw prizes, burned LOT for ETH, approved LOT spending and closed the lottery.

Winner of the lottery was Player 1. The prize was 10 LOT.

Link to main file: [lottery.tsx](week4/client/pages/lottery.tsx) 


