module.exports = function (json) {
    for (var i = 0; i < Object.keys(json["keywords"]).length; i++) {
        regex_str = "";
        for (var j = 0; j < json.keywords[Object.keys(json["keywords"])[i]].length; j++) {
            regex_str += json.keywords[Object.keys(json["keywords"])[i]][j] + "|";
        }
        regex_str = regex_str.substring(0, regex_str.length - 1);
        json.keywords[Object.keys(json["keywords"])[i]].regex = regex_str;
    }
    return json;
}