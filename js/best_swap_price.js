const {liquidity}=require('./vitcswap_get.js')
function tobase(n)
{
    let a=10**18
    let b=BigInt(100)
    let c=typeof(b)
    if(typeof(n)==c)
    a=BigInt(a)
    return n*a
}
function toint(n)
{   let a=10**18
    let b=BigInt(100)
    let c=typeof(b)
      if(typeof(n)==c)
        a=BigInt(a)
    return n/a
}
async function bswap(side,vitex_price,bal,last_price)
{  if(bal<52)
    return 0
    let data=await liquidity();
    let x=BigInt(data[0]);
    let y=BigInt(data[1]);
    let k=BigInt(data[2]);
let ydash;
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
       price=price*10036/10000;
       console.log(price)
        min_vitc=51/price;
        min_vitc=tobase(min_vitc)
        min_vitc=min_vitc.toLocaleString('fullwide', {useGrouping:false})
        let n=BigInt(min_vitc) 
        ydash=y-(k/(x+n));
        ydash=ydash*BigInt(996)/BigInt(1000);
         ydash=Number(ydash)
        ydash=toint(ydash)
       min_vitc=toint(min_vitc)
       
         if(ydash>51)
         {
            f=1;
            break;
         }
    }
    if(f==0)
    return 0
    else
    {
        let profit=(ydash-51)
        let vitex_volume=51
        let last_vitex_volume=51,last_min_vitc=min_vitc,last_ydash=ydash;
        while(true&&vitex_volume<bal)
        {
            min_vitc=min_vitc+100
        min_vitc=tobase(min_vitc)
        min_vitc=min_vitc.toLocaleString('fullwide', {useGrouping:false})
        n=BigInt(min_vitc)
       ydash=y-(k/(x+n));
        ydash=ydash*BigInt(996)/BigInt(1000);
        ydash=Number(ydash)
        ydash=toint(ydash)
       min_vitc=toint(min_vitc)
        vitex_volume=(min_vitc*price)
        last_profit=ydash-vitex_volume
        if(vitex_volume<bal)
        {
            last_vitex_volume=vitex_volume
            last_min_vitc=min_vitc
            last_ydash=ydash
        }
        if(last_profit<=profit)
         break
            profit=last_profit
        }
        return [last_min_vitc,pr,last_vitex_volume,last_ydash]
    }
 } 

}
/*async function foo()
{ let last_price=0;
    let best_buy=await bswap(0,[0.007],1000,last_price)
    console.log(best_buy)
}
foo();*/
module.exports={bswap}
