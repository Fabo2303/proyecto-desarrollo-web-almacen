package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Uemail;

public interface UemailRepository extends JpaRepository<Uemail, String>{
    Optional<Uemail> findByEmail(String email);
    Optional<Uemail> findByEmailAndPassword(String email, String password);
}
