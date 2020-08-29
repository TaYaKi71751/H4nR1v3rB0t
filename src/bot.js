require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const phantom = require('phantom');
const cheerio = require('cheerio');
const bot = new TelegramBot(process.env.bot_token, { polling: true });
bot.on('inline_query', function (query) {
    (async function () {
        var URI = 'http://swo.seoul.go.kr/water/waterMesntkInfo.do';
        var instance = await phantom.create();
        var page = await instance.createPage();
        await page.on('onResourceRequested', function (requestData) {
            console.info('Requesting', requestData.url);
        });

        var status = await page.open(URI);
        var content = await page.property('content');
        var $ = cheerio.load(content, { xml: { normalizeWhiteSpace: true, }, });
        $('tbody#schResult').html();
        var i = -1;
        nrjInfo = null;
        for (var i = 0; i < $('tbody[id=schResult]')[0].children.length; i++) {
            if ($('tbody[id=schResult]')[0].children[i].children[2].children[0].data !== "노량진") continue; nrjInfo = {
                date: {
                    YYYY:$('tbody[id=schResult]')[0].children[i].children[0].children[0].data.substring(0,4),
                    MM:$('tbody[id=schResult]')[0].children[i].children[0].children[0].data.substring(4,6),
                    DD:$('tbody[id=schResult]')[0].children[i].children[0].children[0].data.substring(6,8)
                },
                time: {
                    HH:$('tbody[id=schResult]')[0].children[i].children[1].children[0].data.split(":")[0],
                    mm:$('tbody[id=schResult]')[0].children[i].children[1].children[0].data.split(":")[1]
                },
                name: $('tbody[id=schResult]')[0].children[i].children[2].children[0].data,
                temp: $('tbody[id=schResult]')[0].children[i].children[3].children[0].data,
            }; break;
        }
        bot.answerInlineQuery(query.id, [{
            id: '0',
            type: 'article',
            title: 'Noryangjin',
            description: 'Send Temp from swo.seoul.go.kr',
            message_text: '' + nrjInfo.temp + '℃'
        }],{cache_time:0});

        await instance.exit();
    })();
      });