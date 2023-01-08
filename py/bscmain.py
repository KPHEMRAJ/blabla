import requests
import bsc
import vitex_coinex
import discordapi
c1 = vitex_coinex.coinex()
v1=vitex_coinex.vitex()
vite_usdt = c1.depth("VITEUSDT", '1')
vite_usdt = vite_usdt["data"]
vite_usdt = vite_usdt["last"]
vite_usdt = float(vite_usdt)
bnb_usdt = c1.depth("BNBUSDT", '1')
bnb_usdt = bnb_usdt["data"]
bnb_usdt = bnb_usdt["last"]
bnb_usdt = float(bnb_usdt)
vite_bnb = bnb_usdt/vite_usdt
def foo(token,pair,vitex_pair):
    token1 = bsc.get_balance(token)
    token2 = bsc.get_pair_balance(token,pair)
    token1 = float(token1)
    token2 = float(token2)
    token1_token2 = token2/token1
    if(pair=="bnb"):
        token1_vite = vite_bnb*token1_token2
    else:
        token1_vite=1/vite_usdt*token1_token2
    data = v1.depth(vitex_pair)
    data = data["data"]
    asks = data["asks"]
    bids = data["bids"]
    sell = asks[0][0]
    buy = bids[0][0]
    sell = float(sell)
    buy = float(buy)
    return[token1_vite,buy,sell]
#main
data=foo("vitc","bnb","VITC-000_VITE")
vitc_vite=data[0]
buy=data[1]
sell=data[2]
data = foo("viva", "bnb", "VIVA-000_VITE")
viva_vite = data[0]
buy = data[1]
sell = data[2]
data = foo("vicat", "bnb", "VICAT-000_VITE")
vicat_vite = data[0]
buy = data[1]
sell = data[2]
data = foo("cent", "busd", "CENT-000_VITE")
cent_vite = data[0]
buy = data[1]
sell = data[2]
print(cent_vite,buy,sell)