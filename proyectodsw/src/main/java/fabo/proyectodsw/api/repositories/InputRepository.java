package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Input;

public interface InputRepository extends JpaRepository<Input, Integer>{
    Optional<Input> findById(int id);
}
