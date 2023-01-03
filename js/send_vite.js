
const {accountBlock, ViteAPI} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')

const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})


const AccountBlock = accountBlock.AccountBlock;
async function send(from,to,token_id,amounts){
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address:from,
    toAddress:to,
    tokenId:token_id,
    amount:amounts
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('private key in hex');
let data=myAccountBlock.autoSend()
try{await data}
catch(e)
{ return e}
}
module.exports={send}

/*
const {send}=require('./send.js')
async function foo()
{let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123";
let token_id="tti_541b25bd5e5db35166864096";
let amount=1
 amount=amount.toString();
    let data=await send(from,to,token_id,amount);
    if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
foo()
*/
