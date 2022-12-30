const {cancel_order} = require('./cancel_order.js');
const {get_depth,get_orders,get_exchange_balance,post_order}=require('./vitex.js')
const {sleep}=require('./sleep.js')
const {discord_bot}=require('./discord_api')
const {liquidity}=require('./get_liquidity.js')
symbol={
 "vitc":"VITC-000_VITE"
}
address={
    "hem":"vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965"
}
vitc_arb={
'buy1':null,
'buy2':null,
'sell1':null,
'sell2':null
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
async function create_order(amount,price,side,pair){
let data=await post_order(amount,price,side,pair);
console.log(data)
code=data.code
message=data.msg
if(code!=0)
{discord_bot(message)
return}
data=data.data
order_id=data.orderId
if(side===0&&vitc_arb.buy1===null)
    vitc_arb.buy1=order_id
else if(side==0&&vitc_arb.buy2==null)
vitc_arb.buy2=order_id
else if(side==1&&vitc_arb.sell1==null)
vitc_arb.sell1=order_id
else if(side==1&&vitc_arb.sell2==null)
vitc_arb.sell2=order_id
return order_id
}
async function exchange_balance()
{let data=await get_exchange_balance(address.hem);
    return data;
}
async function orders()
{
let order=await get_orders(address.hem)
let latest_order=order.data.order[0]
latest_order_id=latest_order.orderId;
return latest_order;
}
async function modify(order_id,token_id)
{
    let order=await get_orders(address.hem)
    let data=order.data;
    let ord=data.order
    let i=0
      while(1)
        {if(ord[i].orderId==order_id)
        {if(ord[i].status==7||ord[i].status==8)
            {if(vitc_arb.buy1==order_id)
            vitc_arb.buy1=null;
            if(vitc_arb.buy2==order_id)
            vitc_arb.buy2=null;
            if(vitc_arb.sell1==order_id)
            vitc_arb.sell1=null;
            if(vitc_arb.sell2==order_id)
            vitc_arb.sell2=null;
        break;}
        else
        i++;
    }
    else
    {sleep(5000);
        cancel_order(order_id,token_id)}
}
}
async function delete_order(order_id,token_id)
{ cancel_order(order_id,token_id);
    modify(order_id,token_id);
}
async function vitcswap_liquidity()
{ let d=await liquidity()
 let x=d[0]//token
 let y=d[1]//vite
 let k=d[2]//x*y
 console.log(x,y,k)
}
async function main()
{
    //let order_id=await orders()
    //console.log(order_id)
   // delete_order(order_id,"tti_f9bd6782f966f899d74d7df8")
   //let data=await create_order(1000,0.1,0,"BAN-001_VITE")
 //console.log(data)
 vitcswap_liquidity()
 
    
}
main()
