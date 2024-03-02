package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Output;

public interface OutputRepository extends JpaRepository<Output, Integer>{
    Optional<Output> findById(int id);
}
