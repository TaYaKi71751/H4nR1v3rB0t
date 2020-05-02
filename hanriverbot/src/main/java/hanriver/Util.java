package hanriver;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.client.*;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;

class Util {
    public String getInfo() {
        String URI = "http://hangang.dkserver.wo.tc";

        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpResponse resp = client.execute(new HttpGet(URI));
            if (resp.getStatusLine().getStatusCode() == 200) {
                return (String) ((ResponseHandler<String>) new BasicResponseHandler()).handleResponse(resp);
            } else {
                return "response is error : " + resp.getStatusLine().getStatusCode();
            }
        } catch (IOException e) {
            return e.toString();
        }

    }

    public String getMessage(String jsonString) {
        String[] aa = jsonString.replace("\"", " ").split(" ");
        String temp = aa[8];
        String[] date = aa[12].split("-");
        String[] time = aa[13].split(":");
        String msg = "한강의 온도는\n\t\t\t\t\t" + temp + " ℃\n";
        for (int i = 0; i < date.length; i++)
            msg += (date[i].charAt(0) == '0' ? date[i].substring(1) :
             date[i])
                            + ((boolean) (i == 0) ? "년 " :
                             (boolean) (i == 1) ? "월 " :
                              (boolean) (i == 2) ? "일 \n" :
                               "");

                               for (int i = 0; i < date.length; i++)
            msg += (time[i].charAt(0) == '0' ? time[i].substring(1) :
             time[i])
                            + ((boolean) (i == 0) ? "시 " :
                             (boolean) (i == 1) ? "분 " :
                              (boolean) (i == 2) ? "초 측정\n" :
                               "");
        System.out.println(aa);
        return msg;
    }
}