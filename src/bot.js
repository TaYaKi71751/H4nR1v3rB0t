require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const bot = new TelegramBot(process.env.bot_token, { polling: true });
bot.on('inline_query', function (query) {
    fetch("http://swo.seoul.go.kr/water/waterMesntkInfoResult.do?schFrDate=&schEnDate=&currentPage=&siteId=")
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.resultList.length && i < 5; i++) {
                switch (data.resultList[i].SITE_ID.replace("_자동", "")) {
                    case "선유": sunyu = data.resultList[i]; break;
                    case "노량진": noryangjin = data.resultList[i]; break;
                    case "탄천": tancheon = data.resultList[i]; break;
                    case "중랑천": jungrangcheon = data.resultList[i]; break;
                    case "안양천": anyangcheon = data.resultList[i]; break;
                    default: break;
                }
            }
            bot.answerInlineQuery(query.id, [{
                id: '0',
                type: 'article',
                title: sunyu.SITE_ID.replace("_자동", ""),
                description: "[" + sunyu.SITE_ID.replace("_자동", "") + "]" + "\n" + sunyu.W_TEMP + '℃' + "(" + sunyu.MSR_DATE.substring(0, 4) + "년" + sunyu.MSR_DATE.substring(4, 6) + "월" + sunyu.MSR_DATE.substring(6, 8) + "일 " + sunyu.MSR_TIME + ")",
                message_text: "[" + sunyu.SITE_ID.replace("_자동", "") + "]" + "\n" + sunyu.W_TEMP + '℃' + "(" + sunyu.MSR_DATE.substring(0, 4) + "년" + sunyu.MSR_DATE.substring(4, 6) + "월" + sunyu.MSR_DATE.substring(6, 8) + "일 " + sunyu.MSR_TIME + ")"
            }, {
                id: '1',
                type: 'article',
                title: noryangjin.SITE_ID.replace("_자동", ""),
                description: "[" + noryangjin.SITE_ID.replace("_자동", "") + "]" + "\n" + noryangjin.W_TEMP + '℃' + "(" + noryangjin.MSR_DATE.substring(0, 4) + "년" + noryangjin.MSR_DATE.substring(4, 6) + "월" + noryangjin.MSR_DATE.substring(6, 8) + "일 " + noryangjin.MSR_TIME + ")",
                message_text: "[" + noryangjin.SITE_ID.replace("_자동", "") + "]" + "\n" + noryangjin.W_TEMP + '℃' + "(" + noryangjin.MSR_DATE.substring(0, 4) + "년" + noryangjin.MSR_DATE.substring(4, 6) + "월" + noryangjin.MSR_DATE.substring(6, 8) + "일 " + noryangjin.MSR_TIME + ")"
            }, {
                id: '2',
                type: 'article',
                title: tancheon.SITE_ID.replace("_자동", ""),
                description: "[" + tancheon.SITE_ID.replace("_자동", "") + "]" + "\n" + tancheon.W_TEMP + '℃' + "(" + tancheon.MSR_DATE.substring(0, 4) + "년" + tancheon.MSR_DATE.substring(4, 6) + "월" + tancheon.MSR_DATE.substring(6, 8) + "일 " + tancheon.MSR_TIME + ")",
                message_text: "[" + tancheon.SITE_ID.replace("_자동", "") + "]" + "\n" + tancheon.W_TEMP + '℃' + "(" + tancheon.MSR_DATE.substring(0, 4) + "년" + tancheon.MSR_DATE.substring(4, 6) + "월" + tancheon.MSR_DATE.substring(6, 8) + "일 " + tancheon.MSR_TIME + ")"
            }, {
                id: '3',
                type: 'article',
                title: jungrangcheon.SITE_ID.replace("_자동", ""),
                description: "[" + jungrangcheon.SITE_ID.replace("_자동", "") + "]" + "\n" + jungrangcheon.W_TEMP + '℃' + "(" + jungrangcheon.MSR_DATE.substring(0, 4) + "년" + jungrangcheon.MSR_DATE.substring(4, 6) + "월" + jungrangcheon.MSR_DATE.substring(6, 8) + "일 " + jungrangcheon.MSR_TIME + ")",
                message_text: "[" + jungrangcheon.SITE_ID.replace("_자동", "") + "]" + "\n" + jungrangcheon.W_TEMP + '℃' + "(" + jungrangcheon.MSR_DATE.substring(0, 4) + "년" + jungrangcheon.MSR_DATE.substring(4, 6) + "월" + jungrangcheon.MSR_DATE.substring(6, 8) + "일 " + jungrangcheon.MSR_TIME + ")"
            }, {
                id: '4',
                type: 'article',
                title: anyangcheon.SITE_ID.replace("_자동", ""),
                description: "[" + anyangcheon.SITE_ID.replace("_자동", "") + "]" + "\n" + anyangcheon.W_TEMP + '℃' + "(" + anyangcheon.MSR_DATE.substring(0, 4) + "년" + anyangcheon.MSR_DATE.substring(4, 6) + "월" + anyangcheon.MSR_DATE.substring(6, 8) + "일 " + anyangcheon.MSR_TIME + ")",
                message_text: "[" + anyangcheon.SITE_ID.replace("_자동", "") + "]" + "\n" + anyangcheon.W_TEMP + '℃' + "(" + anyangcheon.MSR_DATE.substring(0, 4) + "년" + anyangcheon.MSR_DATE.substring(4, 6) + "월" + anyangcheon.MSR_DATE.substring(6, 8) + "일 " + anyangcheon.MSR_TIME + ")"
            }], { cache_time: 0 });
        });
});