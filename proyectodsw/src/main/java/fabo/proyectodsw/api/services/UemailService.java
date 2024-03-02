package fabo.proyectodsw.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Uemail;
import fabo.proyectodsw.api.repositories.UemailRepository;


@Service
public class UemailService {
    @Autowired
    private UemailRepository uemailRepository;

    public Optional<Uemail> getUemail(String email){
        return uemailRepository.findByEmail(email);
    }

    public Optional<Uemail> getUemail(String email, String password){
        return uemailRepository.findByEmailAndPassword(email, password);
    }

    @SuppressWarnings("null")
    public void saveUemail(Uemail uemail){
        uemailRepository.save(uemail);
    }
}
