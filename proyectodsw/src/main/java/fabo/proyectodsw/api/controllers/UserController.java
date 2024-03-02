package fabo.proyectodsw.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.User;
import fabo.proyectodsw.api.services.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("save")
    public User save(@RequestBody User user) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userService.save(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        User authenticatedUser = userService.findByUserNameAndPassword(username, password);
        if (authenticatedUser != null) {
            String token = generateAccessToken(username);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @GetMapping("findAll")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("findById/{id}")
    public User findById(@PathVariable int id) {
        return userService.findById(id);
    }

    @GetMapping("findByUsername/{username}")
    public User findByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @PutMapping("updatePassword/{username}/{password}")
    public User updatePassword(@PathVariable String username, @PathVariable String password) {
        User userToUpdate = userService.findByUsername(username);
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);
        userToUpdate.setPassword(encodedPassword);
        System.out.println(userToUpdate.toString());
        return userService.save(userToUpdate);
    }

    @PutMapping("update")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    private String generateAccessToken(String username) {
        return "jwt_token";
    }
}