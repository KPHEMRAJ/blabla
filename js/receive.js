const {
    accountBlock, ViteAPI, wallet
} = require('@vite/vitejs');
const { HTTP_RPC } = require('@vite/vitejs-http');

const { ReceiveAccountBlockTask } = accountBlock;
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})

const account = wallet.getWallet("passphrase mnemonics")
    .deriveAddress(0)

const ReceiveTask = new ReceiveAccountBlockTask({
    address: account.address,
    privateKey: account.privateKey,
    provider: viteProvider,
});
console.log(account.privateKey)
ReceiveTask.onSuccess((result) => {
    if(!result.accountBlockList)return
    console.log("success", result);
});
ReceiveTask.onError((error) => {
    console.log("error", error);
});
ReceiveTask.start({
    checkTime: 3000,
    transactionNumber: 10
});