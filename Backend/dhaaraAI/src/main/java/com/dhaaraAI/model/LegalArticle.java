package com.dhaaraAI.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "legal_articles")
public class LegalArticle {

    @Id
    private String id;

    @NonNull
    private String section;

    @NonNull
    private String act;

    @NonNull
    private String title;

    @NonNull
    private String description;
}
