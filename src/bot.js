require('dotenv').config();
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.bot_token, { polling: true });
bot.on('inline_query', function (query) {
    fetch('http://127.0.0.1:8080/koreawqijson/temperature/river')
        .then(response => response.json())
        .then((data) => {
            inlineQueryString = "[";
            for (var i = 0; i < data["Han"].length; i++) {
                inlineQueryString += "{" +
                    "\"id\": " + "\"" + i + "\"," +
                    "\"type\": " + "\"article\"," +
                    "\"title\": " + "\"" + data["Han"][i].name + "\"," +
                    "\"description\": " + "\"" + (data["Han"][i].temp.trim() === "정보없음" ? data["Han"][i].temp.trim() : data["Han"][i].temp.trim() + "℃") + "\"," +
                    "\"message_text\": " + "\"" + "[" + data["Han"][i].name + "]\\n" + (data["Han"][i].temp.trim() === "정보없음" ? data["Han"][i].temp.trim() : data["Han"][i].temp.trim() + "℃") + "\\n" +
                     data.date.substring(0, data.date.length - 4) + "년 " +
                      (data.date.substring(data.date.length - 4, data.date.length - 2).charAt(0)==='0' ? data.date.substring(data.date.length - 4, data.date.length - 2).replace("0"," ") : data.date.substring(data.date.length - 4, data.date.length - 2)) + "월 \\n " +
                       (data.date.substring(data.date.length - 2, data.date.length).charAt(0)==='0' ? data.date.substring(data.date.length - 2, data.date.length).replace("0"," ") : data.date.substring(data.date.length - 2, data.date.length)) + "일 " +
                        (data.time.charAt(0)==='0' ? data.time.replace("0"," "):data.time) + "시" + "\"";
                inlineQueryString += (data["Han"].length - 1 === i ? "}]" : "},");
            }
            bot.answerInlineQuery(query.id, JSON.parse(inlineQueryString), { cache_time: 0 });
        })
});