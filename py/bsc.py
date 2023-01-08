import requests

url = "https://api.bscscan.com/api"
api_key = ""
contract_address={
    "cent": "0xee37A338e781b9b86f3E79fBF09D6032D2DBc109",
    "vitc": "0x7C3cc93f39F0dbC9E00F96d1Fa4eA52E36b3476B",
    "vicat": "0x3BFAD48181C9E88E1dD9C1B48887E33E2653dB4d",
    "viva": "0xBC1afF2C8fBcF65a96e4A634F2d69D2cd483036A",
    "bnb": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "busd": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

}
pancake_address={
    "vitc": "0xfc5a7fa67494677fb806da463e8df950205090b0",
    "viva": "0xcf4a986c832d281b0b7f3690550cdb030868f954",
    "vicat": "0x387F1E0f57180D4e516165D7dbf001dAda3da3E9",
    "cent": "0x292b2118812c9a43d8994271a81dbce870eeaf6b"
}
def get_balance(token):
    uurl = url+"?module=account&action=tokenbalance&contractaddress="+contract_address[token] +"&address="+pancake_address[token]+"& tag = latest"+"&apikey="+api_key
    response = requests.request("GET",uurl)
    response=response.json()
    response=response["result"]
    return response

def get_pair_balance(token,pair):
    uurl = url+"?module=account&action=tokenbalance&contractaddress=" + \
        contract_address[pair] + "&address=" + \
        pancake_address[token]+"& tag = latest"+"&apikey="+api_key
    response = requests.request("GET", uurl)
    response = response.json()
    response = response["result"]
    return response


