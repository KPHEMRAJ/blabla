const {cancel_order} = require('./cancel_order.js');
const {get_depth,get_orders,get_exchange_balance,post_order}=require('./vitex.js')
const {sleep}=require('./sleep.js')
const {discord_bot}=require('./discord_api')
const {vite_conversion}=require('./get_conversion.js')
let int_256=1000000000
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
function tobase256(n)
{
n=n*int_256*int_256
return n
}
function toint(n)
{
    n=n/(int_256*int_256)
    return n
}
async function depth(side){
  depth=await get_depth(symbol.vitc)
  data=depth.data
  asks=data.asks
  bids=data.bids
  /*asks1=asks[0][0]
  bids1=bids[0][0]
  asks2=asks[1][0]
  bids2=bids[1][0]*/
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
async function best_price_swap(side,vitex_price,pos,bal,last_price)
{ 
let f=0,i=1
let price
 if(side==0)
 {
    for(j in vitex_price)
    {  price=vitex_price[j]
       price=price+0.000001 
       pr=price
       if(pr==last_price)
       return 0
        min_vitc=51/(price *1004/1000)
        price=51/min_vitc
        //console.log(price)
        min_vitc=tobase256(min_vitc)
        min_vitc=min_vitc.toLocaleString('fullwide', {useGrouping:false})
       vite_amount=await vite_conversion(token_id["vitc"],token_id["vite"],min_vitc)
       vite_amount=toint(vite_amount)
       min_vitc=toint(min_vitc)
         if(vite_amount>51)
         {
            f=1;
            break;
         }
    }
    if(f==0)
    return 0
    else
    {
        let profit=(vite_amount-51)
        let vitex_volume=51
        console.log(profit)
        while(true&&vitex_volume<bal)
        {  min_vitc=min_vitc+1000
        min_vitc=tobase256(min_vitc)
        min_vitc=min_vitc.toLocaleString('fullwide', {useGrouping:false})
        vite_amount=await vite_conversion(token_id["vitc"],token_id["vite"],min_vitc,min_vitc)
        vite_amount=toint(vite_amount)
        min_vitc=toint(min_vitc)
        vitex_volume=(min_vitc*price)
         console.log(min_vitc,vitex_volume)
        last_profit=vite_amount-vitex_volume
        //console.log(last_profit)
        if(last_profit<=profit)
         break
            profit=last_profit
        }
        return [min_vitc,pr]
    }
 } 
 else
 {
   for(j in vitex_price)
    { 
         price=vitex_price[j]
       price=price-0.000001 
       pr=price
        min_vitc=51/price 
        max_vite=bal*price
        x=51*1004/1000;
        y=51
        x=tobase256(x)
        x=x.toLocaleString('fullwide', {useGrouping:false})
       vitc_amount=await vite_conversion(token_id["vite"],token_id["vitc"],x)
       vitc_amount=toint(vitc_amount)
       x=toint(x)
         if(vitc_amount>min_vitc)
         {
            f=1;
            break;
         }
    }
    if(f==0)
    return 0
    else
    {
        let profit=vitc_amount-min_vitc
        while(true&&y<bal)
        { y=y+1
        y=tobase256(y)
        y=y.toLocaleString('fullwide', {useGrouping:false})
        vitc_amount=await vite_conversion(token_id["vite"],token_id["vitc"],x)
        vitc_amount=toint(vitc_amount)
        y=toint(y)
        vitex_volume=(y*(1/price))*(996/1000)
        last_profit=vitc_amount-vitex_volume
        console.log(vitc_amount,vitex_volume)
        if(last_profit<=profit)
        { return [y,vitex_volume,pr] }
            profit=last_profit
        }
    } 
 }
}
async function main()
{
    //let order_id=await orders()
    //console.log(order_id)
   // delete_order(order_id,"tti_f9bd6782f966f899d74d7df8")
  
 //console.log(data)
 //let a=await exchange_balance('VITE')
 //console.log(a)
    /* let data=await best_price_swap(0,[0.008,0.0075,0.007018],1)
     b=a/data[2]
   / amount=Math.min(b,data[0])
    amount=(amount*990)/1000
    console.log(amount)*/
//let a=await exchange_balance('VITE')
     //let data=await best_price_swap(1,[0.01,0.016,0.007018],1)
     //console.log(data)
    ///*while(1)
     // if(vitc_arb.buy1!=null){
     /* let status=get_status(vitc_arb.buy1)
        status[1]=parseFloat(status[1])
        if(status[0]==5||status[0]==4)
        {
            await delete_order(vitc_arb.buy1,token_id.vitc)
           //swap()
            //make balance equal
        }
     // }
         */
         /* last_price=0
        let vite_ex_balance= await exchange_balance('VITE');
        let vitc_ex_balance= await exchange_balance("VITC-000");
        let buy_array=await depth(0)
        for( i in buy_array)
        buy_array[i]=parseFloat(buy_array[i])
        let best_buy=await best_price_swap(0,buy_array,1,vite_ex_balance-5,last_price)
        last_price=best_buy[1]
        console.log(best_buy)
        if(best_buy!=0){
          //create buy order
          //update
        }*/
        last_price=0
        if(vitc_arb.buy1!=null)
        {
            let my_buy=get_status(vitc_arb.buy1)
            let dep=depth(0)
            if(dep[0]>my_buy&&dep)
            {

            }

        }
       
// }
    
}
main()
