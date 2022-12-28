
const {
    accountBlock, ViteAPI, wallet
} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')

const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})


const AccountBlock = accountBlock.AccountBlock;

const myAccountBlock = new AccountBlock({
    blockType: 2,
    address: 'vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67',
    toAddress: 'vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123',
    tokenId: 'tti_541b25bd5e5db35166864096',
    amount: '1'
});
myAccountBlock.setProvider(viteProvider).setPrivateKey('Passphrase in hex');
myAccountBlock.autoSend().then(data => {
    console.log('success', data);
}).catch(err => {
    console.warn(err);
});
