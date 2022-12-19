import time
import requests
import hashlib
#import calendar
import datetime
import hmac
#import binascii


def create_sha256_signature(key, message):

    #byte_key = binascii.unhexlify(key)
    byte_key = str.encode(key)
    message = message.encode()
    return hmac.new(byte_key, message, hashlib.sha256).hexdigest()


def time_stamp():
    return int(time.time()*1000)


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
        self.message = "amount="+self.amount+"&key=" + \
            self.api_key+"&price="+self.price+"&side="+self.side+"&symbol="+self.symbol+"&timestamp=" + \
            str(time_stamp())
        self.url=self.url+"order"
        s = create_sha256_signature(self.secret_key, self.message)
        payload = self.message+"&signature="+str(s)
        headers = {}
        response = requests.request("POST", self.url, headers=headers, data=payload)
        print(response.text)
        self.url=self.url.replace("order",'')


    def get_orders(self):
        self.url = self.url+"orders?address="+self.address

        payload = {}
        headers = {}
        response = requests.request("GET", self.url, headers=headers, data=payload)
        print(response.text)
        s = "orders?address="+self.address
        self.url=self.url.replace(s,'')


v1=vitex()

v1.create_order()
v1.get_orders()
