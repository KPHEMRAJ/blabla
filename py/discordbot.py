import discord
from discord.ext import tasks

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(command_prefix="!", intents=intents)


@client.event
async def on_ready():
    print(f"We have logged in as {client.user}")
    myloop.start()


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith("hi"):
        await message.channel.send("Hello!")


@tasks.loop(seconds=10)
async def myloop():
    channel = client.get_channel("channel")
    await channel.send("Message")

client.run(
    "token")
