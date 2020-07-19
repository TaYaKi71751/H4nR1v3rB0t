const token = 'YOUR_DISCORD_BOT_TOKEN';
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const URI = 'http://hangang.dkserver.wo.tc';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.id != client.user.id &&msg.content.includes("한강")) {
    fetch(URI)
        .then(res =>res.json())
        .then(data => {
            var time = data.time;
            while(time = time.  replace("-"," ").replace(":"," "))
                if(!time.includes(":")&&!time.includes("-")) {
                    time=time.split(" ");
                    break;
                }
            msg.reply("한강 수온은"
          + "\n" + "\t" + "섭씨" + data.temp + "도 입니다."
          + "\n" + "\t" + time[0] + " 년 "
                        + (time[1].indexOf("0") === 0 ? time[1].charAt(1).toString() : time[1]) + " 월 "
                        + (time[2].indexOf("0") === 0 ? time[2].chatAt(1).toString() : time[2]) + " 일 "
          + "\n" + "\t" + (time[3].indexOf("0") === 0 ? time[3].charAt(1).toString() : time[3]) + " 시 "
                        + (time[4].indexOf("0") === 0 ? time[4].charAt(1).toString() : time[4]) + " 분 "
                        + (time[5].indexOf("0") === 0 ? time[5].charAt(1).toString() : time[5]) + " 초 " + "측정"
                 + "\n" + "출처 : " + URI);
        });
  }
});

client.login(token);