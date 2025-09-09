package com.dhaaraAI.controller;

import com.dhaaraAI.model.LegalArticle;
import com.dhaaraAI.repository.LegalArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class LegalArticleController {

    private final LegalArticleRepository legalArticleRepository;

    // GET all articles
    @GetMapping
    public List<LegalArticle> getAll() {
        return legalArticleRepository.findAll();
    }

    // POST a new article
    @PostMapping
    public LegalArticle add(@RequestBody LegalArticle article) {
        return legalArticleRepository.save(article);
    }

    // GET article by section
    @GetMapping("/{section}")
    public ResponseEntity<LegalArticle> getBySection(@PathVariable String section) {
        LegalArticle article = legalArticleRepository.findBySection(section)
                .orElseThrow(() -> new RuntimeException("Article not found for section: " + section));

        return ResponseEntity.ok(article);
    }
}
