import requests
import json

URL = "https://api.nanswap.com/v1/get-estimate?from=XNO&to=BAN&amount="+'10'

response = requests.get(URL)
userdata = json.loads(response.text)
price= userdata["amountTo"]/userdata["amountFrom"]
   

print(price)
