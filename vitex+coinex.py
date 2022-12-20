import hmac
import hashlib
import requests
import time


def time_stamp():
    return int(time.time()*1000)


def create_sha256_sign(key, message):

    byte_key = str.encode(key)
    message = message.encode()
    return hmac.new(byte_key, message, hashlib.sha256).hexdigest()


def create_md5_sign(params, secret_key):
    sort_params = sorted(params)
    s = ""
    for item in sort_params:
        s = s+item+'='+params[item]+'&'
    s = s+"secret_key="+secret_key
    token = hashlib.md5(s.encode()).hexdigest().upper()
    return token


class coinex:
    access_id = ""
    secret_key = ""
    url = "https://api.coinex.com/v1/"

    def depth(self):
        url = self.url+"market/depth?market=CETUSDT&merge=0.00001"
        response = requests.request("GET", url)
        print(response.text)

    def balance(self):
        params = {
        "access_id":self.access_id,
        "tonce":str(time_stamp())
        }
        url = self.url+"balance/info?access_id="+self.access_id+"&tonce=" + \
            str(time_stamp())
        
        headers = {"authorization": create_md5_sign(params, self.secret_key)}
        response = requests.request("GET", url, headers=headers)
        print(response.text)
    
    def fees(self):
        url = self.url+"account/market/fee?"
        params={
        "access_id":self.access_id,
        "tonce":str(time_stamp()),
        "market":"VITEUSDT"
        }
        for a in params:
            url=url+a+'='+params[a]+'&' 
        url=url[:-1]
        headers = {"authorization": create_md5_sign(params, self.secret_key)}
        response = requests.request("GET", url, headers=headers)
        print(response.text)

    def withdraw(self):
        url = self.url+"balance/coin/withdraw"
        data={
        "access_id": self.access_id,
        "tonce": str(time_stamp()),
        "coin_type":"BAN",
        "coin_address":"ban_3sef57qz717a9z1ochzhrhkiiyeofozhgcfhrspoq8o9m4xaio7kk48jpdwj",
        "actual_amount":"1001"
        }
        headers = {"authorization": create_md5_sign(data, self.secret_key)}
        response = requests.request("POST", url, headers=headers,json=data)
        print(response.text)
    
    def deposit_address(self):
        url = self.url+"balance/deposit/address/vite?" + "access_id="+self.access_id+"&tonce="+str(time_stamp())
        params = {
            "access_id": self.access_id,
            "tonce": str(time_stamp())
        }
        headers = {"authorization": create_md5_sign(params, self.secret_key)}
        response = requests.request("GET", url, headers=headers)
        print(response.text)

    def create_order(self):
        url = self.url+"order/limit"
        data = {
            "access_id": self.access_id,
            "tonce": str(time_stamp()),
            "market": "BANUSDT",
            "type": "sell",
            "amount": "989",
            "price": "0.006596"
        }
        headers = {"authorization": create_md5_sign(data, self.secret_key)}
        response = requests.request("POST", url, headers=headers,json=data)
        print(response.text)

    def is_maintanace(self):
        url=self.url+"common/maintain/info"
        response = requests.request("GET", url)
        print(response.text)
        url=self.url+"common/temp-maintain/info"
        response = requests.request("GET", url)
        print(response.text)



        
class vitex:

    secret_key = ""
    api_key = ""
    amount = "1000"
    price = "0.051"
    side = "0"
    symbol = "BAN-001_VITE"
    order_id = ""
    url = "https://api.vitex.net/api/v2/"
    address = "vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965"

    def create_order(self):
        message = "amount="+self.amount+"&key=" + \
            self.api_key+"&price="+self.price+"&side="+self.side+"&symbol="+self.symbol+"&timestamp=" + \
            str(time_stamp())
        url = self.url+"order"
        s = create_sha256_sign(self.secret_key, message)
        payload = message+"&signature="+str(s)
        headers = {}
        response = requests.request(
            "POST", url, headers=headers, data=payload)
        print(response.text)

    def order_history(self):
        url = self.url+"orders?address="+self.address
        payload = {}
        headers = {}
        response = requests.request(
            "GET", url, headers=headers, data=payload)
        print(response.text)
    
    def depth(self):
        url = self.url+"depth"
        params = {"symbol": "VITE_USDT-000"}
        response = requests.request("GET", url, params=params)
        print(response.text)
    
    def order_limit(self):
        url=self.url+"limit"
        response = requests.request("GET", url)
        print(response.text)
        dict=response.json()
        data=dict["data"]
        minAmount=data["minAmount"]
        print(minAmount["USDT-000"])

    def exchange_balance(self):
        url = self.url+"balance"
        params = {
            "address": "vite_d4d963fa23f035b11d529f1fffd9606706a057f2e93131f123"}
        response = requests.request("GET",url,params=params)
        print(response.text)





v1 = vitex()
#v1.create_order()
#v1.order_history()
#v1.depth()
#v1.order_limit()
#v1.exchange_balance()
c1 = coinex()
#c1.depth()
#c1.balance()
#c1.fees()
#c1.withdraw()
#c1.deposit_address()
#c1.create_order()
#c1.is_maintanace()
