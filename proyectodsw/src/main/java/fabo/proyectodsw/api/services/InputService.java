package fabo.proyectodsw.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Input;
import fabo.proyectodsw.api.repositories.InputRepository;

@Service
public class InputService {
    @Autowired
    private InputRepository inputRepository;

    public List<Input> findAll() {
        return inputRepository.findAll();
    }

    public Optional<Input> findById(int id) {
        return inputRepository.findById(id);
    }

    @SuppressWarnings("null")
    public Input save(Input input) {
        return inputRepository.save(input);
    }
}
