import requests
import json

URL = "https://api.nanswap.com/v1/get-estimate?from=XNO&to=BAN&amount="+'10'

response = requests.get(URL)
userdata = json.loads(response.text)
to = userdata["amountTo"]/userdata["amountFrom"]
   

print(to)