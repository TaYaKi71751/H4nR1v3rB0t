const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(bot_token, { polling: true });
var exec = require('child_process').exec, child;
var hanriver;
const URI = "http://hangang.dkserver.wo.tc/";
const helpMessage = "Keywords : {" + "\n" + "\t한강,\n" + "\t\*대교\n" + "}\n" + "Commands : {" + "\n" + "\t\/help " + ": Help Command" + "\n" + "\t/hanriver_temperature " + ": GET Han River's Temperature" + "\n" + "}";
bot.on('message', (msg) => {
    var chatId = msg.chat.id;
    if (msg.text.indexOf("\/help") === 0)
        bot.sendMessage(chatId, helpMessage);
    if (msg.text && msg.text.includes("한강")
        || msg.text.indexOf("대교") > 0
        || msg.text.indexOf("\/hanriver_temperature") === 0) {
        child = exec("echo "
            + "$(curl "
            + "-LsSfH "
            + "'Cache-Control: no-cache' "
            + URI
            + ")",
            function (error, stdout, stderr) {
                hanriver = JSON.parse(stdout);
                console.log("Triggered\n");
                bot.sendMessage(chatId, "한강 물 온도는 섭씨 "
                    + hanriver.temp + " 도 입니다.\n"
                    + hanriver.time.substring(0, 4)
                    + "년 "
                    + hanriver.time.substring(hanriver.time.substring(5, 6) === "0" ? 6 : 5, 7)
                    + "월 "
                    + hanriver.time.substring(hanriver.time.substring(9, 10) === "0" ? 9 : 8, 10)
                    + "일 "
                    + hanriver.time.substring(hanriver.time.substring(11, 12 === "0" ? 11 : 10), 13)
                    + "시 "
                    + hanriver.time.substring(hanriver.time.substring(14, 15) === "0" ? 15 : 14, 16)
                    + "분 "
                    + hanriver.time.substring(hanriver.time.substring(17, 18) === "0" ? 18 : 17, 19)
                    + "초 "
                    + "측정"
                    + "\n"
                    + "출처 : "
                    + URI
                );
            });
        child();

    }
});