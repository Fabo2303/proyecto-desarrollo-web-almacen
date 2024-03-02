package fabo.proyectodsw.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.InputDetail;
import fabo.proyectodsw.api.repositories.InputDetailRepository;

@Service
public class InputDetailService {
    @Autowired
    private InputDetailRepository inputDetailRepository;

    public List<InputDetail> findAll() {
        return inputDetailRepository.findAll();
    }

    public Optional<InputDetail> findById(int id) {
        return inputDetailRepository.findById(id);
    }

    @SuppressWarnings("null")
    public InputDetail save(InputDetail inputDetail) {
        return inputDetailRepository.save(inputDetail);
    }
}
