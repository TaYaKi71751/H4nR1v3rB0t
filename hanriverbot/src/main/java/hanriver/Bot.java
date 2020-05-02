package hanriver;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.ApiContextInitializer;
import org.telegram.telegrambots.TelegramBotsApi;
import org.telegram.telegrambots.api.methods.send.SendMessage;
import org.telegram.telegrambots.api.objects.Update;
import org.telegram.telegrambots.exceptions.TelegramApiException;
import hanriver.*;
import java.util.Scanner;
public class Bot extends TelegramLongPollingBot {
    private static String botToken = "";
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);botToken = sc.nextLine();sc.close();
        ApiContextInitializer.init();
        TelegramBotsApi telegramBotsApi = new TelegramBotsApi();
        Bot bot = new Bot();

        try {
            telegramBotsApi.registerBot(bot);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onUpdateReceived(Update update) {
        // TODO
        if (update.hasMessage() && update.getMessage().hasText()) {
            Util util = new Util();
            SendMessage msg = new SendMessage().enableHtml(false)
                    .setText(util.getMessage(util.getInfo()))
                    .setChatId(update.getMessage().getChatId());
            try {
                execute(msg);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }
    
    @Override
    public String getBotUsername() {
        return Config.getBotUsername();
    }
    @Override
    public String getBotToken() {
        return botToken;
    }
}
