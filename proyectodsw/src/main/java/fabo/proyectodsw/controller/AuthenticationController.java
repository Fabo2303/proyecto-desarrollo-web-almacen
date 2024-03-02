package fabo.proyectodsw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.User;
import fabo.proyectodsw.api.repositories.UserRepository;
import fabo.proyectodsw.dto.AuthenticationRequest;
import fabo.proyectodsw.dto.AuthenticationResponse;
import fabo.proyectodsw.service.AuthenticationService;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("permitAll")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("El usuario no existe");
        }

        AuthenticationResponse response = authenticationService.login(authRequest);
        if (response.getJwt() == null) {
            return ResponseEntity.status(404).body("La contraseña es incorrecta");
        }

        if (user.getRole() == null) {
            return ResponseEntity.status(404).body("El usuario no tiene un rol asignado");
        }

        if (!user.isEnabled()) {
            return ResponseEntity.status(404).body("El usuario no está habilitado");
        }
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("permitAll")
    @GetMapping("/public-access")
    public ResponseEntity<String> publicAccess() {
        return ResponseEntity.ok("Public access");
    }
}
