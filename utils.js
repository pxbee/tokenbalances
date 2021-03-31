const { toBN, fromWei } = require('web3-utils');
const fetch = require('node-fetch');

const tokenSource = 'https://tokens.honeyswap.org';

const getTokens = async () => {

  let data = await fetch(tokenSource, {
    methods: 'GET',
    headers: { 'Content-Type': 'application/json', }
  }).then(response => {
    return response.json();
  });

  return data.tokens;
};

const tokenPriceSource = 'https://api.coingecko.com/api/v3/simple/token_price/xdai?';

const getTokenPrices = async (ids) => {

  const params = new URLSearchParams({
    vs_currencies: 'usd',
    contract_addresses: ids
  });

  let data = await fetch(tokenPriceSource + params, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', },
  }).then(response => {
    return response.json();
  });

  return data;
}

const convertToNumber = (hex, decimals) => {
  const balance = toBN(hex);
  return fromWei(balance);
};

module.exports = {
  convertToNumber,
  getTokens,
  getTokenPrices
};
