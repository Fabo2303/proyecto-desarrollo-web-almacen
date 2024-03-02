package fabo.proyectodsw.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Provider;


public interface ProviderRepository extends JpaRepository<Provider, Integer>{
    Optional<Provider> findByRuc(String ruc);
    Optional<Provider> findByBusinessName(String businessName);
    Optional<Provider> findByPhone(String phone);
    Optional<Provider> findByEmail(String email);
    Optional<Provider> findByNameEmployee(String nameEmployee);
    Optional<Provider> findByAddress(String address);
    Optional<Provider> findByActive(boolean active);
    List<Provider> findTop10ByOrderByBusinessNameAsc();
}
