url="https://api.coinex.com/v1/"
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
async function get_depth(pair){
let data=fetch(url+"market/depth?market="+pair+"&merge=0.000001&limit=1", requestOptions)
return (await data).json()}
async function coinex_main()
{    let data;
    /*let data=await get_depth()
    let sell=data.data.asks[0][0]
    let buy=data.data.bids[0][0]
    console.log(sell,buy)*/
    data=await get_depth("VITEUSDT")
    data=data.data.last
    let vite=data;
    data=await get_depth("BNBUSDT")
    data=data.data.last
    let bnb=data;
    let vite_bnb=bnb/vite
    return vite_bnb
    
}
module.exports={coinex_main}