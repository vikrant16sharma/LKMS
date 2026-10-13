package com.algoatlas.auth.service;

import com.algoatlas.auth.dto.AuthenticationResponse;
import com.algoatlas.auth.dto.LoginRequest;
import com.algoatlas.auth.dto.RegisterRequest;
import com.algoatlas.auth.entity.User;
import com.algoatlas.auth.exception.EmailAlreadyExistsException;
import com.algoatlas.auth.exception.InvalidCredentialsException;
import com.algoatlas.auth.exception.UserNotFoundException;
import com.algoatlas.auth.mapper.UserMapper;
import com.algoatlas.auth.repository.UserRepository;
import com.algoatlas.security.JwtService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserMapper userMapper,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }

        User user = userMapper.toEntity(request);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(buildUserDetails(savedUser));

        return new AuthenticationResponse(token, userMapper.toResponse(savedUser));
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        String email = normalizeEmail(request.getEmail());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(buildUserDetails(user));
        return new AuthenticationResponse(token, userMapper.toResponse(user));
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    private UserDetails buildUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(user.getRole().name())
                .disabled(!Boolean.TRUE.equals(user.getEnabled()))
                .build();
    }
}