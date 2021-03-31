const abi = [
 {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const username = 'username'; // replace with your Ethereum node RPC username
const password = 'password'; // replace with your Ethereum node RPC password
//const rpcEndpoint = 'https://nd-123-456-789.p2pify.com'; // replace with your Ethereum node RPC endpoint
//const bathEndpoint = `https://${username}:${password}@nd-123-456-789.p2pify.com`; // replace with your Ethereum node RPC endpoint

const rpcEndpoint = bathEndpoint = 'https://dai.poa.network'; // replace with your Ethereum node RPC endpoint
const walletAddress = '0x986a2fCa9eDa0e06fBf7839B89BfC006eE2a23Dd'; // replace with the address you want to query

module.exports = {
  abi,
  bathEndpoint,
  password,
  rpcEndpoint,
  username,
  walletAddress,
};
