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
        // BUG: In commit 7b4f91e, unchecked dereference caused NullPointerException on null payload
        var result = userService.registerUser(request.getEmail(), request.getPassword(), request.getFullName());
        return ResponseEntity.ok(result);
    }
}
