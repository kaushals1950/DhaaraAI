package com.dhaaraAI.service;

import com.dhaaraAI.model.Lawyer;
import com.dhaaraAI.repository.LawyerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LawyerService {
    private final LawyerRepository lawyerRepository;

    public LawyerService(LawyerRepository lawyerRepository) {
        this.lawyerRepository = lawyerRepository;
    }

    public List<Lawyer> getAllLawyers() {
        return lawyerRepository.findAll();
    }

    public Lawyer getLawyerById(String id) {
        return lawyerRepository.findById(id).orElse(null);
    }

    public Lawyer addLawyer(Lawyer lawyer) {
        return lawyerRepository.save(lawyer);
    }

    public void deleteLawyer(String id) {
        lawyerRepository.deleteById(id);
    }
}
