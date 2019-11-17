const Matic = require('maticjs').default
const config = require('./config')

async function maticBal(_address)
{
// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  maticWethAddress: config.MATICWETH_ADDRESS,
})
matic.wallet = config.PRIVATE_KEY // prefix with `0x`

const tokenAddress = config.MATIC_TEST_TOKEN // token address on mainchain
//const from = config.FROM_ADDRESS // from address
const from = _address;
let variable =0;
await matic.balanceOfERC20(from, tokenAddress).then((hash) => { 
  // action on Transaction success
  variable = hash;
})
return variable;
}
module.exports = maticBal;
