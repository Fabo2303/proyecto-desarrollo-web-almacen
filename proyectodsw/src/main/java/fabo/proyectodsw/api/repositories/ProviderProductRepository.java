package fabo.proyectodsw.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.ProviderProduct;

public interface ProviderProductRepository extends JpaRepository<ProviderProduct, Integer>{
    Optional<ProviderProduct> findById(int id);
}
