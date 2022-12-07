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


presentDate = datetime.datetime.now()
timestamp = int(datetime.datetime.timestamp(presentDate))
timestamp = timestamp*1000

SECRET_KEY = "API_SECRET_KEY"
API_KEY = "API_ACCESS_KEY"
MESSAGE = "amount=1000&key=" + \
    str(API_KEY)+"&price=0.051&side=0&symbol=BAN-001_VITE&timestamp=" + \
    str(timestamp)  # pair
s = create_sha256_signature(SECRET_KEY, MESSAGE)
url = "https://api.vitex.net/api/v2/order"
print(s)
payload = MESSAGE+"&signature="+str(s)
headers = {
    'Content-Type': 'text/plain'
}


response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
