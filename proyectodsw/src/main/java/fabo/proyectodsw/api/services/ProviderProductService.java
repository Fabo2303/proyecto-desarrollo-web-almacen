package fabo.proyectodsw.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.ProviderProduct;
import fabo.proyectodsw.api.repositories.ProviderProductRepository;

@Service
public class ProviderProductService {
    @Autowired
    private ProviderProductRepository providerProductRepository;

    public List<ProviderProduct> findAll() {
        return providerProductRepository.findAll();
    }

    public Optional<ProviderProduct> findById(int id) {
        return providerProductRepository.findById(id);
    }

    @SuppressWarnings("null")
    public ProviderProduct save(ProviderProduct providerProduct) {
        return providerProductRepository.save(providerProduct);
    }

    
}
