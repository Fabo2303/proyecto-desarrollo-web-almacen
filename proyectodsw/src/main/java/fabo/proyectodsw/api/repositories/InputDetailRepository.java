package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.InputDetail;

public interface InputDetailRepository extends JpaRepository<InputDetail, Integer>{
    Optional<InputDetail> findById(int id);
}
