const get_conversion={
        "inputs": [
            {
                "internalType": "tokenId",
                "name": "from",
                "type": "tokenId"
            },
            {
                "internalType": "tokenId",
                "name": "to",
                "type": "tokenId"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "getConversion",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "returnAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

const swap={
      
        "inputs": [
            {
                "internalType": "address payable",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "tokenId",
                "name": "targetToken",
                "type": "tokenId"
            },
            {
                "internalType": "uint256",
                "name": "minimum",
                "type": "uint256"
            }
        ],
        "name": "swap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
const get_liquidity={
        "inputs": [
            {
                "internalType": "tokenId",
                "name": "token",
                "type": "tokenId"
            }
        ],
        "name": "getLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalVITE",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "k",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tknSupply",
                "type": "uint256"
            },
            {
                "internalType": "tokenId",
                "name": "lpToken",
                "type": "tokenId"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }