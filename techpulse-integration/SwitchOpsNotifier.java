package com.techpulse.config;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Drop this class into your TechPulse project (e.g. src/main/java/com/techpulse/config/SwitchOpsNotifier.java).
 * Call SwitchOpsNotifier.sendAlert(...) whenever an unhandled exception or 500 error occurs.
 */
public class SwitchOpsNotifier {

    private static final String SWITCHOPS_WEBHOOK_URL = "http://localhost:3000/webhook/alert";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(3))
            .build();

    public static void sendAlert(String title, Throwable throwable) {
        new Thread(() -> {
            try {
                String errorMsg = throwable.getMessage() != null ? throwable.getMessage().replace("\"", "\\\"") : "Unknown Error";
                String stackTrace = throwable.getStackTrace().length > 0 ? throwable.getStackTrace()[0].toString() : "";

                String jsonPayload = String.format("""
                    {
                      "alert": {
                        "id": "INC-%d",
                        "title": "%s",
                        "service": "techpulse-backend",
                        "errorMessage": "%s",
                        "stackTrace": "%s",
                        "severity": "P0_CRITICAL",
                        "environment": "production"
                      }
                    }
                    """, System.currentTimeMillis() % 10000, title, errorMsg, stackTrace);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(SWITCHOPS_WEBHOOK_URL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                        .build();

                httpClient.send(request, HttpResponse.BodyHandlers.discarding());
                System.out.println("[SwitchOps] Successfully dispatched incident alert to Switch War Room!");
            } catch (Exception e) {
                System.err.println("[SwitchOps] Failed to notify war room: " + e.getMessage());
            }
        }).start();
    }
}
