
const {accountBlock, ViteAPI,abi} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')
const {swap}=require('./vitcswap_abi')
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})

async function vitc_swap(from,to,token_id,amount){
    
    let result=abi.encodeFunctionCall(swap, ['vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67', 'tti_b3fbb46b9318b3d168ba904e',"0"]);

var base_64 = Buffer.from(result, 'hex').toString('base64')
const AccountBlock = accountBlock.AccountBlock;
const myAccountBlock = new AccountBlock({
    blockType: 2,
    address:from,
    toAddress: to,
    tokenId: token_id,
    amount: amount,
    data:base_64
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('private key in hex');
data=myAccountBlock.autoSend()
try{
    await data
}
catch(e)
{
    return e;
}}
module.exports={vitc_swap}

/*
const {vitc_swap}=require('./vitcswap_swap.js')
async function foo()
{let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123";
let token_id="tti_541b25bd5e5db35166864096";
let amount=1
 amount=amount.toString();
    let data=await vitc_swap(from,to,token_id,amount);
    if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
foo()
*/
