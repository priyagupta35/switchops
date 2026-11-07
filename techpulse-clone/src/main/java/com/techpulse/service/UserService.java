package com.techpulse.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final Map<String, String> userDatabase = new HashMap<>();

    public Map<String, Object> registerUser(String email, String password, String fullName) {
        userDatabase.put(email, password);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("email", email);
        response.put("fullName", fullName);
        response.put("userId", "usr_" + System.currentTimeMillis() % 10000);
        return response;
    }
}
