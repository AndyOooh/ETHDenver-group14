export const lotteryData: contractData = {
  address: '0x5f539341E79732B32C1dBC9dab6F04C309b60995',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'tokenName',
          type: 'string'
        },
        {
          internalType: 'string',
          name: 'tokenSymbol',
          type: 'string'
        },
        {
          internalType: 'uint256',
          name: '_purchaseRatio',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_betPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_betFee',
          type: 'uint256'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      inputs: [],
      name: 'bet',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'betFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'times',
          type: 'uint256'
        }
      ],
      name: 'betMany',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'betPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'betsClosingTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'betsOpen',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'closeLottery',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getRandomNumber',
      outputs: [
        {
          internalType: 'uint256',
          name: 'randomNumber',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'closingTime',
          type: 'uint256'
        }
      ],
      name: 'openBets',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'ownerPool',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'ownerWithdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'paymentToken',
      outputs: [
        {
          internalType: 'contract LotteryToken',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'prize',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'prizePool',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'prizeWithdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'purchaseRatio',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'purchaseTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'returnTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
};
