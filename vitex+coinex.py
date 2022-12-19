import hmac
import hashlib
import requests
import time


def time_stamp():
    return int(time.time()*1000)


def create_sha256_sign(key, message):

    #byte_key = binascii.unhexlify(key)
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
        payload = {}
        headers = {}
        url = self.url+"market/depth?market=CETUSDT&merge=0.00001"
        response = requests.request("GET", url, headers=headers, data=payload)
        print(response.text)

    def balance(self):
        params = {}
        params["access_id"] = self.access_id
        params["tonce"] = str(time_stamp())
        url = self.url+"balance/info?access_id="+self.access_id+"&tonce=" + \
            str(time_stamp())
        payload = {}
        headers = {"authorization": create_md5_sign(params, self.secret_key)}
        response = requests.request("GET", url, headers=headers, data=payload)
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

    def get_orders(self):
        url = self.url+"orders?address="+self.address

        payload = {}
        headers = {}
        response = requests.request(
            "GET", url, headers=headers, data=payload)
        print(response.text)


v1 = vitex()
v1.create_order()
v1.get_orders()
c1 = coinex()
c1.depth()
c1.balance()
