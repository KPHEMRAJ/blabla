
const {
    accountBlock, ViteAPI, wallet
} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')
const {abi} =require('@vite/vitejs');
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
result=abi.encodeFunctionCall({
	'type': 'function', 'name': 'DexFundUserDeposit', 'inputs': [] 
    });
var base_64 = Buffer.from(result, 'hex').toString('base64')
const AccountBlock = accountBlock.AccountBlock;

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67',
    toAddress: 'vite_0000000000000000000000000000000000000006e82b8ba657',
    tokenId: 'tti_5649544520544f4b454e6e40',
    amount: '1',
    data:base_64
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('passphrase in hex');
myAccountBlock.autoSend().then(data => {
    console.log('success', data);
}).catch(err => {
    console.warn(err);
});