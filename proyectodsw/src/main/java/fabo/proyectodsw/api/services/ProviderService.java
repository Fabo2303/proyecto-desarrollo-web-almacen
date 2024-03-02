package fabo.proyectodsw.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Provider;
import fabo.proyectodsw.api.repositories.ProviderRepository;

@Service
public class ProviderService {
    @Autowired
    private ProviderRepository providerRepository;

    @SuppressWarnings("null")
    public Provider save(Provider provider) {
        return providerRepository.save(provider);
    }

    public List<Provider> findAll() {
        return providerRepository.findAll();
    }

    public Provider findById(int id) {
        return providerRepository.findById(id).orElse(null);
    }

    public Provider findByRuc(String ruc) {
        return providerRepository.findByRuc(ruc).orElse(null);
    }

    public Provider findByBusinessName(String businessName) {
        return providerRepository.findByBusinessName(businessName).orElse(null);
    }

    public Provider findByPhone(String phone) {
        return providerRepository.findByPhone(phone).orElse(null);
    }

    public Provider findByEmail(String email) {
        return providerRepository.findByEmail(email).orElse(null);
    }

    public Provider findByNameEmployee(String nameEmployee) {
        return providerRepository.findByNameEmployee(nameEmployee).orElse(null);
    }

    public Provider findByAddress(String address) {
        return providerRepository.findByAddress(address).orElse(null);
    }

    public Provider findByActive(boolean active) {
        return providerRepository.findByActive(active).orElse(null);
    }

    public List<Provider> findTop10ByOrderByBusinessNameAsc() {
        return providerRepository.findTop10ByOrderByBusinessNameAsc();
    }

    @SuppressWarnings("null")
    public Provider update(Provider provider) {
        return providerRepository.save(provider);
    }
}
