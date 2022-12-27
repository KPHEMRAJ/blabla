
vitex={
url:"https://api.vitex.net/api/v2/",
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