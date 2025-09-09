package com.dhaaraAI.service;

import com.dhaaraAI.dto.LoginRequest;
import com.dhaaraAI.dto.RegisterRequest;
import com.dhaaraAI.dto.AuthResponse;
import com.dhaaraAI.dto.LoginRequest;
import com.dhaaraAI.dto.RegisterRequest;
import jakarta.validation.Valid;

public interface AuthService {
    AuthResponse register(@Valid RegisterRequest request);
    AuthResponse login(@Valid LoginRequest request);
}
