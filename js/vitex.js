const { data } = require("config-json");
const CryptoJS= require("crypto-js");

authentication={
  sha_256_hmac:function(request_string,api_secret_key)
  {
  var hash = CryptoJS.HmacSHA256(request_string,api_secret_key);
  return hash.toString(CryptoJS.enc.Hex);
  }
}
url="https://api.vitex.net/api/v2/"
api_key=""
api_secret_key=""

async function get_orders(address){
    let data=await fetch(url+"orders?address="+address);
    return data.json();
}
async function get_depth(symbol){
let data = await fetch(url+"depth?symbol="+symbol)
  return data.json()
}
async function get_exchange_balance(address)
{  let data= await fetch(url+"/balance?address="+address);
return data.json();
}
async function post_order(amount,price,side,symbol)
{let request_string="amount="+amount+"&key="+api_key+"&price="+price+"&side="+side+"&symbol="+symbol+"&timestamp="+Date.now()
let signature=authentication.sha_256_hmac(request_string,api_secret_key);
let raw=request_string+"&signature="+signature;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

let fetch_response=await fetch(url+"order", requestOptions)
return fetch_response.json()
 
  
}

module.exports={get_depth,get_orders,get_exchange_balance,post_order}




