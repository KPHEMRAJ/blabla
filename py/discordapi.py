import requests
import time
url = "https://discord.com/api/v10/channels/channel_id/messages"

payload = {
    "content": "hi"
}
header = {"authorization": "Bot Token"
          }
while True:
    r = requests.request("POST", url, data=payload, headers=header)
    time.sleep(10)
