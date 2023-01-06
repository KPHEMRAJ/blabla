const {cancel_order} = require('./cancel_order.js');
const {get_depth,get_orders,get_exchange_balance,post_order}=require('./vitex.js')
const {sleep}=require('./sleep.js')
const {discord_bot}=require('./discord_api')
const {bswap}=require('./best_swap_price.js')
symbol={
 "vitc":"VITC-000_VITE"
}
token_id={
"vitc":"tti_22d0b205bed4d268a05dfc3c",
"vite":"tti_5649544520544f4b454e6e40"
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
async function depth(side){
  depth=await get_depth(symbol.vitc)
  data=depth.data
  asks=data.asks
  bids=data.bids
  if(side==1)
  return ([asks[0][0],asks[1][0],asks[2][0],asks[3][0],asks[4][0]])
  else
  return ([bids[0][0],bids[1][0],bids[2][0],bids[3][0],bids[4][0]])
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
async function exchange_balance(token)
{let data=await get_exchange_balance(address.hem);
    data=data.data
    return data[token].available
}
async function get_status(order_id)
{
let order=await get_orders(address.hem)
let data=order.data.order
for(i in data)
{  
    if(data[i].orderId==order_id)
    return [data[i].status,data[i].executedQuantity]
}
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
            //if(vitc_arb.buy2==order_id)
            //vitc_arb.buy2=null;
            if(vitc_arb.sell1==order_id)
            vitc_arb.sell1=null;
            //if(vitc_arb.sell2==order_id)
            //vitc_arb.sell2=null;
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
async function best_price_swap(side,vitex_price,bal)
{ 
let data=await bswap(side,vitex_price,bal)
return data;
}
async function main()
{let status,data,bal,last_price=0,buy_depth;
    //step 1
    //loop
        if(vitc_arb.buy1!=null)
        {
            status=await get_status(vitc_arb.buy1);
            if(status[0]==4||status[0]==5)
            {   await delete_order(vitc_arb.buy1,token_id.vitc)
                //sell status[1] worth in vitcswap
                vitc_arb.buy1=null
                //equalise vitc and vite
            }
        }
        //step 2
        bal= await exchange_balance("VITE")
        buy_depth=await depth(0)
        for( i in buy_depth)
        buy_depth[i]=parseFloat(buy_depth[i])
        data=await best_price_swap(0,buy_depth,bal)
        if(data!=0)
        {
            if(vitc_arb.buy1!=null)
            {await delete_order(vitc_arb.buy1,token_id.vitc)
            vitc_arb.buy1=null
            //create vitex buy order
            //vitc_arb.buy1=buy_order_id
            //last price=order price
        }
        //step 3
        if(vitc_arb.buy1!=null//&& my order position is changed
        )
        //delete order 
        //create order
        //update vitc_arb.buy1


    
}}
main()
