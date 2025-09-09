package com.dhaaraAI.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    @Getter // Optional: explicitly mark getter if needed
    private String id;

    @NonNull
    private String username;

    @NonNull
    private String email;

    @NonNull
    private String password;

    private String role;

    // Custom getter for role to return "CLIENT" if null
    public String getRole() {
        return role != null ? role : "CLIENT";
    }
}
