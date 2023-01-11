const {cancel_order} = require('./cancel_order.js');
const {get_depth,get_orders,get_exchange_balance,post_order,get_balance}=require('./vitex.js')
const {discord_bot}=require('./discord_api')
const {bswap}=require('./best_swap_price.js')
const {vitex_withdraw}=require('./vitex_withdraw.js')
const {vitex_send}=require('./vitex_send.js');
const { RoleSelectMenuBuilder } = require('@discordjs/builders');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
code=data.code
message=data.msg
if(code!=0)
{discord_bot(message)
return}
data=data.data
order_id=data.orderId
return order_id
}
async function exchange_balance(token)
{let data=await get_exchange_balance(address.hem);
    data=data.data
    return data[token].available
}
async function get_status(order_id)
{

}

async function delete_order(order_id,token_id)
{ await cancel_order(order_id,token_id);
}
async function best_price_swap(side,vitex_price,bal)
{ 
let data=await bswap(side,vitex_price,bal)
return data;
}
async function vitc_swap1(amount)
{
let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123";
let token_id=token_id["vitc"]
amount=amount*(10**18)
amount=amount.toString();
let data=await vitc_swap(from,to,token_id,amount);
if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
async function dex_to_main(amount,token)
{
let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_0000000000000000000000000000000000000006e82b8ba657";
let token_id=token_id[token]
amount=amount*(10**18);
 amount=amount.toString();
    let data=await vitex_withdraw(from,to,token_id,amount);
     if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
async function main_to_dex(amount,token)
{
let from="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965";
let to="vite_0000000000000000000000000000000000000006e82b8ba657";
let token_id=token_id[token]
amount=amount.toString();
    let data=await vitex_send(from,to,token_id,amount);
     if(data!=undefined)
    {if(data.error!=undefined)
    console.log(data.error)
    else
console.log(data)}
}
async function get_bal(tokenid)
{let address="vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965"
 let data=await get_balance(address);
 data=data.result.balanceInfoMap[tokenid].balance
 return data;
}

async function main()
{let status,data,bal,last_price=0,buy_depth,pos,last_swap_price;
    while(1){
        //case1 :if old order is partially or completly filled
        if(vitc_arb.buy1!=null)
        {let order=await get_orders(address.hem)
             let data=order.data.order
          for(i in data)
          {   
          if(data[i].orderId==vitc_arb.buy1)
            {   
                status=[data[i].status,data[i].executedQuantity]
                break;}
            }
            
            if(status[0]==4||status[0]==5)
            { 
                await delete_order(vitc_arb.buy1,token_id.vitc)
                await sleep(2000)
                await vitc_swap1(status[1])
                vitc_arb.buy1=null
                let vitc_balex= await exchange_balance("VITC-000")
                let vitc_bal=await get_bal(token_id["vitc"])
                vitc_bal=vitc_bal/(10**18)
                let vitc_mid=(vitc_balex+vitc_bal)/2
                if(vitc_balex>vitc_mid)
                await dex_to_main(vitc_balex-vitc_mid,"vitc")
                else
                await main_to_dex(vitc_bal-vitc_mid,"vitc")
                //await dex_to_main(vitc_bal,"vitc")
                let vite_balex= await exchange_balance("VITE")
                let vite_bal=await get_bal(token_id["vite"])
                vite_bal=vite_bal/(10**18)
                let vite_mid=(vite_balex+vite_bal)/2
                if(vite_balex>vite_mid)
                 await dex_to_main(vite_balex-vite_mid,"vite")
                else
                await main_to_dex(vite_bal-vitc_mid,"vite")    
            }
        }
        //case 2: check if price has been changed on vitcswap
        bal= await exchange_balance("VITE")
        depth=await get_depth(symbol.vitc)
         data=depth.data
        bids=data.bids
         buy_depth=[bids[0][0],bids[1][0],bids[2][0],bids[3][0],bids[4][0]]
        for( i in buy_depth)
        buy_depth[i]=parseFloat(buy_depth[i])
        //console.log(buy_depth)
        data=await best_price_swap(0,buy_depth,1)
        if(last_swap_price==data)
        data=0
        else
        {last_swap_price=data
            data=await best_price_swap(0,buy_depth,bal-5)}
        if(data!=0)
        { data[0]=data[0].toFixed(6)
            data[1]=data[1].toFixed(6)
            vitc_bal=await get_bal(token_id["vitc"])
            vitc_bal=vitc_bal/(10**18)
            data[0]=Math.min(data[0],vitc_bal)//amount in order must never be greater than wallet balance
            //what if min of these doesnt satisfy min order amount?
            if(data[1]*data[0]<=50)
                console.log('min not satisfied')
            else if(vitc_arb.buy1!=null)
            {
                await delete_order(vitc_arb.buy1,token_id.vitc)
            vitc_arb.buy1=null
            await sleep(2000)
            let order_id=await create_order(data[0],data[1],0,"VITC-000_VITE")
            vitc_arb.buy1=order_id
            last_price=data[1]
            parseInt(data[4])
            pos=data[4]
            await sleep(2000)
        }
        else{
            let order_id=await create_order(data[0],data[1],0,"VITC-000_VITE")
            vitc_arb.buy1=order_id
            last_price=data[1]
            parseInt(data[4])
            pos=data[4]
            await sleep(2000)
        }}
        //case 3:checking if order position has been changed
        depth=await get_depth(symbol.vitc)
         data=depth.data
        bids=data.bids
         buy_depth=[bids[0][0],bids[1][0],bids[2][0],bids[3][0],bids[4][0]]
        for( i in buy_depth)
        buy_depth[i]=parseFloat(buy_depth[i])
       if(vitc_arb.buy1!=null)
        {console.log((buy_depth[pos]).toFixed(6),last_price)
        if((buy_depth[pos]).toFixed(6)!=last_price)
       { 
         await delete_order(vitc_arb.buy1,token_id.vitc)
         await sleep(2000)
           bal= await exchange_balance("VITE")
           data=await best_price_swap(0,buy_depth,bal-5)
        if(data!=0)
        { data[0]=data[0].toFixed(6)
            data[1]=data[1].toFixed(6)}
            console.log(data)
        let order_id=await create_order(data[0],data[1],0,"VITC-000_VITE")
            vitc_arb.buy1=order_id
            last_price=data[1]
            parseInt(data[4])
            pos=data[4]
            await sleep(2000)
       }}
       //case 4: the difference bw my order and nearest next order is greater than the lowest possible value
    }
  /*if(vitc_arb.sell!=null)
        {
            status=await get_status(vitc_arb.buy1);
            if(status[0]==4||status[0]==5)
            {   await delete_order(vitc_arb.sell1,token_id.vitc)
                await vitc_swap1(status[1])
                vitc_arb.sell1=null
                 let vitc_balex= await exchange_balance("VITC-000")
                let vitc_bal=get_bal(token_id["vitc"])
                let vitc_mid=(vitc_balex+vitc_bal)/2
                if(vitc_balex>vitc_mid)
                await dex_to_main(vitc_balex-vitc_mid,"vitc")
                else
                await main_to_dex(vitc_bal-vitc_mid,"vitc")
                //await dex_to_main(vitc_bal,"vitc")
                let vite_balex= await exchange_balance("VITE")
                let vite_bal=get_bal(token_id["vite"])
                let vite_mid=(vite_balex+vite_bal)/2
                if(vite_balex>vite_mid)
                 await dex_to_main(vite_balex-vite_mid,"vite")
                else
                await main_to_dex(vite_bal-vitc_mid,"vite")    
            
            }
        }
        //step 2
        bal= await exchange_balance("VITC-000")
        //console.log(bal)
        depth=await get_depth(symbol.vitc)
         data=depth.data
        let asks=data.asks
         let sell_depth=[asks[0][0],asks[1][0],asks[2][0],asks[3][0],asks[4][0]]
        
        for( i in sell_depth)
    sell_depth[i]=parseFloat(sell_depth[i])
        //console.log(buy_depth)
        data=await best_price_swap(0,sell_depth,bal-200)
        if(data!=0)
        {
            if(vitc_arb.sell1!=null)
            {await delete_order(vitc_arb.sell1,token_id.vitc)
            vitc_arb.sell1=null
            let order_id=await create_order(data[0],data[1],0,"VITC-000_VITE")
            vitc_arb.sell1=order_id
            last_price=data[1]
            parseInt(data[4])
        }
        //step 3
       if(vitc_arb.sell1!=null)
        {
        if(sell_depth[pos]!=last_price)
       {  await delete_order(vitc_arb.sell1,token_id.vitc)
        let order_id=await create_order(data[0],data[1],0,"VITC-000_VITE")
            vitc_arb.sell1=order_id
            last_price=data[1]
       }}
    }*/
}

main()
