
const {accountBlock, ViteAPI,abi} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http');
const { data } = require('config-json');
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
async function vitex_send(from,to,token_id,amount){
result=abi.encodeFunctionCall({
	'type': 'function', 'name': 'DexFundUserDeposit', 'inputs': [] 
    });
var base_64 = Buffer.from(result, 'hex').toString('base64')
const AccountBlock = accountBlock.AccountBlock;

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: from,
    toAddress:to,
    tokenId: token_id,
    amount: amount,
    data:base_64
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('private key in hex');
let data=myAccountBlock.autoSend()
try{
    await data;
}
catch(e)
{
    return e;
}
}
module.exports={vitex_send}
/*
const {vitex_send}=require('./vitex_send.js')
async function foo()
{let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_0000000000000000000000000000000000000006e82b8ba657";
let token_id="tti_5649544520544f4b454e6e40";
let amount=1
 amount=amount.toString();
    let data=await vitex_send(from,to,token_id,amount);
     if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
foo();*/
