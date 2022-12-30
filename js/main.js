const {cancel_order} = require('./cancel_order.js');
const {get_depth,get_orders,get_exchange_balance,post_order}=require('./vitex')

symbol={
 "vitc":"VITC-000_VITE"
}
address={
    "hem":"vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965"
}
vitc_arb={
buy1:null,
buy2:null,
sell1:null,
sell2:null
}
async function depth(){
  depth=await get_depth(symbol.vitc)
  data=depth.data
  asks=data.asks
  bids=data.bids
  asks1=asks[0][0]
  bids1=bids[0][0]
  asks2=asks[1][0]
  bids2=bids[1][0]
  return [asks1,asks2,bids1,bids2]
}
async function create_order(){
let data=await post_order(1000,0.1,0,"BAN-001_VITE");
return data;
}
async function exchange_balance()
{let data=await get_exchange_balance(address.hem);
    return data;
}
async function orders()
{
let order=await get_orders(address.hem)
let latest_order=order.data.order[0]
return latest_order;
}
//cancel_order("499035d1a8564f65201d1aff6488877d34a435d3e3d68de0951d2254e1e73137","tti_f9bd6782f966f899d74d7df8")