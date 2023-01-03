const { ViteAPI} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')
const {get_liquidity}=require('./vitcswap_abi.js')
const contractAbi=get_liquidity;
const methodName = 'getLiquidity';
const contractAddress="vite_29ae0b9f951323b3bfe9bb8251bba2830eddacf51631630495";
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
async function liquidity(){
let data=viteProvider.queryContractState({ address: contractAddress, abi: contractAbi,methodName, params:["tti_22d0b205bed4d268a05dfc3c"] })
let resp1=await data
return resp1}

module.exports={liquidity}
