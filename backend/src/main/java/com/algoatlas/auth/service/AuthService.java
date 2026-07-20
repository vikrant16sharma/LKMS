package com.algoatlas.auth.service;

import com.algoatlas.auth.dto.AuthenticationResponse;
import com.algoatlas.auth.dto.LoginRequest;
import com.algoatlas.auth.dto.RegisterRequest;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);
    // it never return the an Entity it always returns DTOs
    // all here is
    // here i also need to do password encoding mapper should not do this 
     
}