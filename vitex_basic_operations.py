#import time
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

    presentDate = datetime.datetime.now()
    timestamp = int(datetime.datetime.timestamp(presentDate))
    timestamp = timestamp*1000
    return timestamp


def create_order(amount,api_key,secret_key,price,side,symbol,url):
    url=url+"order"
    message = "amount="+amount+"&key=" + \
        api_key+"&price="+price+"&side="+side+"&symbol="+symbol+"&timestamp=" + \
        str(time_stamp()) 
    s = create_sha256_signature(secret_key,message)
    payload = message+"&signature="+str(s)
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)

def get_orders(address,url):
    url=url+"orders?address="+address
    payload={}
    headers={}
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)

secret_key = ""
api_key = ""
amount="1000"
price="0.051"
side="0"
symbol="BAN-001_VITE"
order_id=""
url = "https://api.vitex.net/api/v2/"
address = "vite_53376e73f8cad15002c9ef4d5a7e96ceee13f7150dc18e7965"
create_order(amount,api_key,secret_key,price,side,symbol,url)
get_orders(address,url)


