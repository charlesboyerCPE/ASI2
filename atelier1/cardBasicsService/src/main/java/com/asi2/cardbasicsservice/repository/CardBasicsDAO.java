package com.asi2.cardbasicsservice.repository;

import com.asi2.cardbasicsservice.model.CardBasics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardBasicsDAO extends JpaRepository<CardBasics, Long> {
    List<CardBasics> findAll();
}
