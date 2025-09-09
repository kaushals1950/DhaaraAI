package com.dhaaraAI.repository;

import com.dhaaraAI.model.Lawyer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface LawyerRepository extends MongoRepository<Lawyer, String> {

    // Find a lawyer by exact name
    Optional<Lawyer> findByName(String name);

    // Optional: find all lawyers by specialization
    List<Lawyer> findBySpecialization(String specialization);

    // Optional: find by email
    Optional<Lawyer> findByEmail(String email);
}
