package fabo.proyectodsw.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Output;
import fabo.proyectodsw.api.repositories.OutputRepository;

@Service
public class OutputService {
    @Autowired
    private OutputRepository outputRepository;

    public List<Output> findAll() {
        return outputRepository.findAll();
    }

    @SuppressWarnings("null")
    public Output save(Output output) {
        return outputRepository.save(output);
    }

    public Output findById(int id) {
        return outputRepository.findById(id).orElse(null);
    }

    
}
