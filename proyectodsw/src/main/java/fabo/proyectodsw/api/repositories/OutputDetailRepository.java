package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.OutputDetail;

public interface OutputDetailRepository extends JpaRepository<OutputDetail, Integer>{
    Optional<OutputDetail> findById(int id);
}
