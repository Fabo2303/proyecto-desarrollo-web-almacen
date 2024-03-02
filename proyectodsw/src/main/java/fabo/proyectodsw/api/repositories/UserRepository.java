package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findByUsername(String username);
    Optional<User> findById(int id);
}
