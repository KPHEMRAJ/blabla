const {liquidity}=require('./liquidity_test1.js')
function tobase(n)
{
    return n*(10**18)
}
async function fun(n)
{
    let data=await liquidity();
    let x=BigInt(data[0]);
    let y=BigInt(data[1]);
    let k=BigInt(data[2]);
n=BigInt(n)
let ydash=y-(k/(x+n));
console.log(x+n)
ydash=ydash*BigInt(1000)/BigInt(1004);
console.log(ydash);

}
let a=tobase(100)
fun(a)