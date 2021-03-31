const Web3 = require('web3');
const { convertToNumber, getTokens, getTokenPrices } = require('./utils');
const { abi, bathEndpoint, walletAddress } = require('./constant.js');

const web3 = new Web3(new Web3.providers.HttpProvider(bathEndpoint));

const generateContractFunctionList = ({ tokens, blockNumber }) => {
  const batch = new web3.BatchRequest();

  tokens.map(async ({ address: tokenAddress, symbol, decimals }) => {
    const contract = new web3.eth.Contract(abi);
    contract.options.address = tokenAddress;
    batch.add(contract.methods.balanceOf(walletAddress).call.request({}, blockNumber));
  });

  return batch;
};

const main = async () => {
  const tokens = await getTokens();

  const batch = generateContractFunctionList({ tokens });
  // query block number
  // const batch = generateContractFunctionList({ tokens, blockNumber: 11633038 });
  const tokenBalances = [];
  const { response } = await batch.execute();
  let tokenIds = [];

  response.forEach(({ _hex }, index) => {
    const { name, decimals, symbol } = tokens[index];
    if(_hex !== '0x00') {
        tokenBalances.push({
          balance: `${convertToNumber(_hex, decimals)}`,
          ...tokens[index]
        })

        tokenIds.push(tokens[index].address);
    }
  });

  const prices = await getTokenPrices(tokenIds);

  tokenBalances.forEach( token => {
    const price = prices[token.address];
    if(price) {
      token.price = price;
      token.currency = 'usd';
      token.value = token.balance * price.usd;
    }
  });

  console.log(tokenBalances);
};

main();
