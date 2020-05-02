package hanriver;

class Config {
    private static String botUsername = "";
    private static String botTokenString = "";
    static public String getBotUsername(){
        return botUsername;
    }
    static public String getBotToken(){
        return botTokenString;
    }
}