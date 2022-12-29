const {
    accountBlock, ViteAPI, wallet
} = require('@vite/vitejs');
const {HTTP_RPC } = require('@vite/vitejs-http')
const {abi} =require('@vite/vitejs');

let result = abi.encodeFunctionCall({
	name:'getVITEConversion', type:'function', "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",inputs:[{"type":'tokenId', "name": 'token',"internalType": "tokenId"}, {"type":'uint256', "name":'amount'}],
	outputs:[{"name":"","type":"uint256",
                "internalType": "uint256"}]
}, ['tti_80f3751485e4e83456059473', 1000000]);
const methodName = 'getVITEConversion';
const contractAddress="vite_29ae0b9f951323b3bfe9bb8251bba2830eddacf51631630495";
const contractAbi={name:'getVITEConversion', type:'function', "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",inputs:[{"type":'tokenId', "name": 'token',"internalType": "tokenId"}, {"type":'uint256', "name":'amount'}],
	outputs:[{"name":"","type":"uint256",
                "internalType": "uint256"}]
}
console.log(result)
const viteProvider =new ViteAPI(new HTTP_RPC("https://node.vite.net/gvite"), () => {})
viteProvider.queryContractState({ address: contractAddress, abi: contractAbi,methodName, params:['tti_80f3751485e4e83456059473', 1000000] })
.then((result1) => {
	console.log(result1);
});
