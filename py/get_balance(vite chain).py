import requests
import json

url = "https://node-vite.thomiz.dev/"

payload = json.dumps({
    "id": 1,
    "jsonrpc": "2.0",
    "method": "ledger_getAccountInfoByAddress",
    "params": [
        "vite_61f636bdeabd694ace34e2fa0fcfff52037aa4f64904f7499f"
    ]
})
headers = {
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

userdata = json.loads(response.text)
a = userdata["result"]
b = a["balanceInfoMap"]
f = b["tti_22d0b205bed4d268a05dfc3c"]

d = f["balance"]
d = int(d)
d = d/1000000000000000000
print(d)
