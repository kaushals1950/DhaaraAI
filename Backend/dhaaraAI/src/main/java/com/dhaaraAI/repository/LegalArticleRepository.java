package com.dhaaraAI.repository;

import com.dhaaraAI.model.LegalArticle;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface LegalArticleRepository extends MongoRepository<LegalArticle, String> {

    // Find a single article by section
    Optional<LegalArticle> findBySection(String section);

    // Optional: find articles by act
    List<LegalArticle> findByAct(String act);

    // Optional: find articles by title containing a keyword
    List<LegalArticle> findByTitleContainingIgnoreCase(String keyword);
}
