export const tokenBallotData: contractData = {
  address: '0xdC819C7B72b4901967D838666b7ddd2897933B63',
  abi: [
    {
      inputs: [
        {
          internalType: 'bytes32[]',
          name: 'proposalNames',
          type: 'bytes32[]'
        },
        {
          internalType: 'address',
          name: '_tokenContract',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_targetBlockNumber',
          type: 'uint256'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'proposals',
      outputs: [
        {
          internalType: 'bytes32',
          name: 'name',
          type: 'bytes32'
        },
        {
          internalType: 'uint256',
          name: 'voteCount',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'targetBlockNumber',
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
      name: 'tokenContract',
      outputs: [
        {
          internalType: 'contract IMyToken',
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
          internalType: 'uint256',
          name: 'proposal',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'vote',
      outputs: [],
      stateMutability: 'nonpayable',
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
      name: 'votePowerSpent',
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
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'votingpower',
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
      name: 'winnerName',
      outputs: [
        {
          internalType: 'bytes32',
          name: 'winnerName_',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'winningProposal',
      outputs: [
        {
          internalType: 'uint256',
          name: 'winningProposal_',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ]
};
