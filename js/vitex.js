const CryptoJS= require("crypto-js");



authentication={
  sha_256_hmac:function(request_string,api_secret_key)
  {
  var hash = CryptoJS.HmacSHA256(request_string,api_secret_key);
  return hash.toString(CryptoJS.enc.Hex);
  }
}
vitex={
url:"https://api.vitex.net/api/v2/",
api_key:"",
api_secret_key:"",
get_request:{
  method: 'GET',
  redirect : 'follow'
},
get_response:function(url){
fetch(url,vitex.get_request)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
},
get_orders:function(address){
    vitex.get_response(vitex.url+"orders?address="+address);
},
get_depth: function(symbol)
{vitex.get_response(vitex.url+"/depth?symbol="+symbol);
},
get_exchange_balance: function(address)
{  vitex.get_response(vitex.url+"/balance?address="+address);
},
post_order:function(amount,price,side,symbol)
{let request_string="amount="+amount+"&key="+vitex.api_key+"&price="+price+"&side="+side+"&symbol="+symbol+"&timestamp="+Date.now()
let signature=authentication.sha_256_hmac(request_string,vitex.api_secret_key);
let raw=request_string+"&signature="+signature;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(vitex.url+"order", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
}
}

address={
    vite: {
    "hem":"vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123"}
}
pair={
    vitex:{
    "vitc":"VITC-000_VITE"}
}

let v1=vitex
//v1.get_orders(address.vite["hem"])
//v1.get_depth(pair.vitex["vitc"])
//v1.get_exchange_balance(address.vite["hem"]);
v1.post_order(1000,0.1,0,"BAN-001_VITE")
