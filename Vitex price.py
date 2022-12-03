import requests
import json
#import time
j = 2
URL = "https://api.vitex.net/api/v2/ticker/bookTicker?symbol=VITE_USDT-000"
response = requests.get(URL)
userdata = json.loads(response.text)
print(response.text)

price = userdata["data"]
p = price["bidPrice"]
print(p)
'''while p:
    URL = "https://api.vitex.net/api/v2/ticker/bookTicker?symbol=VITE_USDT-000"
    response = requests.get(URL)
    userdata = json.loads(response.text)
    #print(response.text)

    price = userdata["data"]
    p = price["bidPrice"]
    print(p)
    #time.sleep(10)
    '''
