const { SelectMenuOptionBuilder } = require("@discordjs/builders");
const { MentionableSelectMenuComponent } = require("discord.js");
function discord_bot(str){
var myHeaders = new Headers();
myHeaders.append("authorization", "Bot token");

var myBody = new URLSearchParams();
myBody.append("content", str);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: myBody,
  redirect: 'follow'
};

fetch("https://discord.com/api/v10/channels/channel_id/messages", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));}

discord_bot("i am hjcsjgdjf")
