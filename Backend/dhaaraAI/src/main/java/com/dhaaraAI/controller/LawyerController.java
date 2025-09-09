package com.dhaaraAI.controller;

import com.dhaaraAI.model.Lawyer;
import com.dhaaraAI.service.LawyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
@RequiredArgsConstructor
public class LawyerController {

    private final LawyerService lawyerService;

    @GetMapping
    public List<Lawyer> getAllLawyers() {
        return lawyerService.getAllLawyers();
    }

    @GetMapping("/{id}")
    public Lawyer getLawyerById(@PathVariable String id) {
        return lawyerService.getLawyerById(id);
    }

    @PostMapping
    public Lawyer addLawyer(@RequestBody Lawyer lawyer) {
        return lawyerService.addLawyer(lawyer);
    }

    @DeleteMapping("/{id}")
    public void deleteLawyer(@PathVariable String id) {
        lawyerService.deleteLawyer(id);
    }
}
