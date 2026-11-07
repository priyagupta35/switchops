package com.techpulse;

import com.techpulse.controller.AuthController;
import com.techpulse.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;

/**
 * OpenCode Automated Regression Suite for INC-7701
 */
public class AuthControllerTest {

    @Test
    void testRegisterWithNullPayloadDoesNotThrowNPE() {
        UserService userService = new UserService();
        AuthController controller = new AuthController(userService);

        // Before fix: Threw NullPointerException
        // With OpenCode fix: Returns HTTP 400 Bad Request
        ResponseEntity<?> response = controller.register(null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
