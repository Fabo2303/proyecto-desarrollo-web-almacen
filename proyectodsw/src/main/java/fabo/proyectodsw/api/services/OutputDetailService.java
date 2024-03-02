package fabo.proyectodsw.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.OutputDetail;
import fabo.proyectodsw.api.repositories.OutputDetailRepository;

@Service
public class OutputDetailService {
    @Autowired
    private OutputDetailRepository outputDetailRepository;

    public List<OutputDetail> findAll() {
        return outputDetailRepository.findAll();
    }

    @SuppressWarnings("null")
    public OutputDetail save(OutputDetail outputDetail) {
        return outputDetailRepository.save(outputDetail);
    }

    public OutputDetail findById(int id) {
        return outputDetailRepository.findById(id).orElse(null);
    }
    
}
