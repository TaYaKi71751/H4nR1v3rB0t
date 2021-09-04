const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(bot_token, { polling: true });
var exec = require('child_process').exec, child;
var hanriver, time;
const URI = "hangang.dkserver.wo.tc";
const http = "http\:\/\/";
const helpMessage = "Keywords : {"
    + "\n"
    + "\t한강,\n"
    + "\t\*대교\n"
    + "}\n"
    + "Commands : {"
    + "\n"
    + "\t\/help "
    + ": Help Command"
    + "\n"
    + "\t/hanriver_temperature "
    + ": GET Han River's Temperature"
    + "\n"
    + "}";
const mssg = "년 월 일 시 분 초".split(" ");
const msssg = "한강의\t온도는\n\t\t\t\t\t\t \°C\n \n".split(" ");
bot.on('message', (msg) => {
    var chatId = msg.chat.id;
    if (msg.text.indexOf("\/help") === 0)
        bot.sendMessage(chatId, helpMessage);
    if (msg.text && msg.text.includes("한강")
        || msg.text.includes("ハンガン")
        || msg.text.includes("漢江")
        || msg.text.indexOf("대교") > 0
        || msg.text.indexOf("\/hanriver_temperature") === 0) {
        child = exec("echo "
            + "$(curl "
            + "-LsSfH "
            + "'Cache-Control: no-cache' "
            + http
            + URI
            + ")",
            function (error, stdout, stderr) {
                hanriver = JSON.parse(stdout);
<<<<<<< HEAD
                htime = hanriver.time.split(" ");
                date = htime[0].split("-");
                time = htime[1].split(":");
                console.log("Triggered\n");
                message = "한강 물 온도는 섭씨 " + hanriver.temp + " 도 입니다.\n";
                for(var i = 0;i<date.length;i++)
                    message += date[i].indexOf("0") === 0 
                     ? date[i].substring(date[i].indexOf("0") + 1,date[i].length) + datee[i]
                      : date[i] + datee[i];
                for(var i = 0;i<time.length;i++)
                    message += time[i].indexOf("0") === 0
                     ? time[i].substring(time[i].indexOf("0") + 1,time[i].length) + timee[i]
                      : time[i] + timee[i];
                    message += "측정"
                    + "\n"
                    + "출처 : "
                    + URI;
                bot.sendMessage(chatId,message);
=======
                for (time = hanriver.time.replace("-", " ").replace(":", " "); time.includes("-") || time.includes(":");)
                    time = time.replace("-", " ").replace(":", " ");
                time = time.split(" ");
                for (var i = 0; i < time.length; i++)
                    time[i] = time[i].indexOf("0") === 0 ? time[i].substring(1, time[i].length) : time[i];
                var message = "";
                for (var i = 0; i < time.length; i++)
                    message += i % 3 === 0 ? "\n\t" + time[i] + mssg[i] + " " : time[i] + mssg[i] + " ";
                message += "\n";
                for (var i = 0; i < msssg.length; i++)
                    message += i === 1 ? hanriver.temp + msssg[i] : i === 2 ? /*URI +*/ " " + msssg[i] : msssg[i];
                bot.sendMessage(chatId, message);
>>>>>>> bot-edit
            });
        child();
    }
});