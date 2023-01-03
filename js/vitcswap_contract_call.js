
const {accountBlock, ViteAPI,abi} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')
const {swap}=require('./vitcswap_abi')
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
result=abi.encodeFunctionCall(swap, ['vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67', 'tti_b3fbb46b9318b3d168ba904e',"0"]);

var base_64 = Buffer.from(result, 'hex').toString('base64')
const AccountBlock = accountBlock.AccountBlock;

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67',
    toAddress: 'vite_29ae0b9f951323b3bfe9bb8251bba2830eddacf51631630495',
    tokenId: 'tti_5649544520544f4b454e6e40',
    amount: '1',
    data:base_64
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('Passphrase in hex');
myAccountBlock.autoSend().then(data => {
    console.log('success', data);
}).catch(err => {
    console.warn(err);
});
