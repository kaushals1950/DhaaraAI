package com.dhaaraAI.service.impl;

import com.dhaaraAI.dto.LoginRequest;
import com.dhaaraAI.dto.RegisterRequest;
import com.dhaaraAI.dto.AuthResponse;
import com.dhaaraAI.model.User;
import com.dhaaraAI.repository.UserRepository;
import com.dhaaraAI.security.JwtUtil;
import com.dhaaraAI.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        // Check if user with same email already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Save new user to MongoDB
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("CLIENT") // optional, default role
                .build();

        userRepository.save(user); // <-- MongoDB collection 'users' will be auto-created

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, "Bearer");
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // Fetch user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, "Bearer");
    }
}
