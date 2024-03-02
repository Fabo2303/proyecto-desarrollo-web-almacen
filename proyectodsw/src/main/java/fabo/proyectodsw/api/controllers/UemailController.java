package fabo.proyectodsw.api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.Uemail;
import fabo.proyectodsw.api.services.UemailService;

@RestController
@CrossOrigin
@RequestMapping("/uemail")
public class UemailController {
    @Autowired
    private UemailService uemailService;

    @GetMapping("/login/{email}/{password}")
    public Optional<Uemail> login(@PathVariable String email, @PathVariable String password){
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        Optional<Uemail> uemail = uemailService.getUemail(email);
        if(uemail.isPresent()){
            if(encoder.matches(password, uemail.get().getPassword())){
                return uemail;
            }
        }
        return null;
    }

    @GetMapping("/get/{email}")
    public Optional<Uemail> getUemail(@PathVariable String email){
        return uemailService.getUemail(email);
    }

    @PostMapping("/save")
    public String saveUemail(Uemail uemail){
        uemailService.saveUemail(uemail);
        return "Saved";
    }
}
