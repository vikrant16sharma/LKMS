package com.algoatlas.auth.mapper;

import org.springframework.stereotype.Component;

import com.algoatlas.auth.dto.RegisterRequest;
import com.algoatlas.auth.dto.UserResponse;
import com.algoatlas.auth.entity.Role;
import com.algoatlas.auth.entity.User;
import com.algoatlas.auth.entity.UserProfile;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // Password will be encoded in AuthService
        user.setRole(Role.USER); // role define hua hai 
        user.setEnabled(true); 

        UserProfile profile = new UserProfile();
        user.setProfile(profile);

        return user;
    }

    public UserResponse toResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }

}