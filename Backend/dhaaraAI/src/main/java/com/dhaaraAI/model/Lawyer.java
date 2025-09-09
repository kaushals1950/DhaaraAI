package com.dhaaraAI.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "lawyers")
public class Lawyer {

    @Id
    private String id;

    @NonNull
    private String name;

    @NonNull
    private String specialization; // If multiple, use List<String>

    @NonNull
    private String email;

    @NonNull
    private String phone;
}
