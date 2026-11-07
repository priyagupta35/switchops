package com.techpulse.controller;

import com.techpulse.dto.RegisterRequest;
import com.techpulse.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody(required = false) RegisterRequest request) {
        // [OpenCode Safe Fix - Incident INC-7701]
        // Guard against null payload or missing email
        if (request == null || request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(java.util.Map.of(
                "error", "VALIDATION_FAILED",
                "message", "Registration payload and email cannot be null or empty"
            ));
        }

        var result = userService.registerUser(request.getEmail(), request.getPassword(), request.getFullName());
        return ResponseEntity.ok(result);
    }
}
