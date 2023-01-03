const {accountBlock, ViteAPI, abi} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')

const { data } = require('config-json');
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
async function cancel_order(order_id,token_id){
result=abi.encodeFunctionCall({
	'type': 'function', 'name': 'CancelOrderByTransactionHash', 'inputs': [ { 'name': 'sendHash', 'type': 'bytes32' } ]},[order_id]);
var base_64 = Buffer.from(result, 'hex').toString('base64')
const AccountBlock = accountBlock.AccountBlock;

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965',
    toAddress: 'vite_00000000000000000000000000000000000000079710f19dc7',
    tokenId:token_id,
    data:base_64
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('private key in hex');
let data=myAccountBlock.autoSend()
try
{ await data;}
catch(e)
{return e;}}
/*cancel_order("626ceed9b2d5c08164a9f95996770aae8fe2a48d8f84a40880ed64031f9a5c51","tti_f9bd6782f966f899d74d7df8")*/
module.exports={cancel_order}

/*
const {cancel_order}=require('./cancel_order.js')
async function foo()
{
    let data=await cancel_order("626ceed9b2d5c08164a9f95996770aae8fe2a48d8f84a40880ed64031f9a5c51","tti_f9bd6782f966f899d74d7df8")
    if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error);
    else
    console.log(data)}
    
}
foo()
*/
