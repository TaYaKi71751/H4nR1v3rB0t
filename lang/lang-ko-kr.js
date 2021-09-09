
module.exports = {
    "result": [
        "한강의 수온은 ",
        " \°C 입니다.\n",
    ],
    "time": "년 월 일 시 분 초".split(" "),
    "keywords": {
        "hanriver": [
            "한강",
            "漢江",
        ],
        "bridge": [
            "대교",
            "大橋"
        ],
    },
};
module.exports = require("./lang_regex")(module.exports);