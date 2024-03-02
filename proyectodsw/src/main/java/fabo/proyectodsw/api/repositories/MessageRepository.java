package fabo.proyectodsw.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Message;
import fabo.proyectodsw.api.entities.Uemail;

public interface MessageRepository extends JpaRepository<Message, Integer>{
    Optional<Message> findById(int id);
    List<Message> findByUemail(Uemail uemail);
    
}
