package fabo.proyectodsw.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.User;
import fabo.proyectodsw.api.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("null")
    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User update(User userEdited){
        User user = userRepository.findById(userEdited.getId()).orElse(null);
        user.setUsername(userEdited.getUsername());
        user.setPassword(userEdited.getPassword());
        return userRepository.save(user);
    }

    public User findByUserNameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password).orElse(null);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
    
    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }
}
