import requests
import time
url = "https://discord.com/api/v10/channels/channel_id/messages"
def tell(message):
    payload = {"content": message}
    header = {
        "authorization": "Bot token"}
    r = requests.request("POST", url, data=payload, headers=header)

