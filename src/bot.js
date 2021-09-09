const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(require('../bot_token'), { polling: true });
var { exec } = require('child_process');
var hanriver, time;
const URI = "hangang.dkserver.wo.tc";
const http = "http\:\/\/";
const helpMessage = "";

const lang = require('../lang/lang.js'), language = "ja-jp";
bot.on('message', (msg) => {
    var chatId = msg.chat.id;
    function f() {
        if (res = !(!(msg.text.match(new RegExp('[' + lang[language]["keywords"]["hanriver"]["regex"] + ']*$'))[0]))) {
            return res;
        }
        if (res = !(!(msg.text.match(new RegExp('[' + lang[language]["keywords"]["bridge"]["regex"] + ']*$'))))) {
            const nameCheck = "A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|一-龯|ぁ-んァ-ヾ|ｧ-ﾝﾞﾟ|Ａ-ｚ|ぁ-ゞ|ァ-ヶ|ｦ-ﾟ",
                bridgeKeywords = lang[language]["keywords"]["bridge"],
                bridgeKeywordsRegex = bridgeKeywords["regex"];
            //Japanese Regex from https://gist.github.com/terrancesnyder/1345094
            var bn = msg.text.substring(0, msg.text.indexOf(msg.text.match(new RegExp('[' + bridgeKeywordsRegex + ']*$'))));
            if (!(bn)) {
                var lastIndex;
                for (var i = 0; i < lang[language]["keywords"]["bridge"].length; i++) {
                    if (i == 0 || msg.text.lastIndexOf(bridgeKeywords[i]) > lastIndex) {
                        lastIndex = msg.text.lastIndexOf(bridgeKeywords[i]);
                    }
                }
                bn = msg.text.substring(0, lastIndex);
                while (!(!(bn.match(new RegExp("((?![" + nameCheck + "]).)"))))) {
                    bn = bn.replace(new RegExp("((?![" + nameCheck + "]).)"), "");
                }
            }
            return !(!(bn.match(new RegExp('[' + nameCheck + ']*$'))[0])) && res;
        }
        return false;
    }
    if (msg.text.indexOf("\/help") === 0)
        bot.sendMessage(chatId, helpMessage);
    if (
        f()
        || msg.text.indexOf("\/hanriver_temperature") === 0) {
        exec("echo "
            + "$(curl "
            + "-LsSfH "
            + "'Cache-Control: no-cache' "
            + http
            + URI
            + ")",
            function (error, stdout, stderr) {
                if (error || stderr) console.error(error, stderr);
                hanriver = JSON.parse(stdout);
                time = hanriver.time.split(new RegExp('[:| |-]'));
                console.log("Triggered\n");
                message = lang[language]["result"][0] + hanriver.temp + lang[language]["result"][1];
                for (var i = 0; i < time.length; i++)
                    message += (!(time[i].indexOf("0")) ? time[i].substring(time[i].indexOf("0")) : time[i]) + lang[language]["time"][i]
                        + ((i + 1 == time.length / 2) ? "\n" : " ") + ((i + 1) == time.length ? "\n" + "*Ref*:" + http + URI : "");
                bot.sendMessage(chatId, message);
            });
    }
});