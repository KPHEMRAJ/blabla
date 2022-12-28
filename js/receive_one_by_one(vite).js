const { accountBlock, ViteAPI, wallet }=require('@vite/vitejs');
const { Account } = accountBlock;
const account = new Account("vite_21dac1fcb30529ee238e67b429459cb56ef34fc023dc724b67");
const { HTTP_RPC } = require('@vite/vitejs-http')
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})

account.setProvider(viteProvider);
account.setPrivateKey("passphrase in hex");

console.log(account.receive({ // blockType: 4
	sendBlockHash: '90e62b7c60e97da60c59e034a15a077c7e707400d20d238727fb71c6c7df9028'
}));


