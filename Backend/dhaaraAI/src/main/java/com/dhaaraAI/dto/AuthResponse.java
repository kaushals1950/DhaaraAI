package com.dhaaraAI.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String tokenType = "Bearer"; // default

    // Optional: you can keep a constructor for custom type
    public AuthResponse(String accessToken, String tokenType) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
