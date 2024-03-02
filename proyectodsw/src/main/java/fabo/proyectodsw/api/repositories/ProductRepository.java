package fabo.proyectodsw.api.repositories;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fabo.proyectodsw.api.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findBySku(String sku);

    Optional<Product> findById(int id);

    List<Product> findByName(String name);

    List<Product> findByCategory(String category);

    List<Product> findByBrand(String brand);

    List<Product> findByActive(boolean active);

    List<Product> findTop10ByOrderByNameAsc();

    @Query("SELECT p FROM Product p WHERE p.expiration < :currentDate AND p.stock > 0")
    List<Product> findExpiredProducts(@Param("currentDate") Date currentDate);

    @Query("SELECT p FROM Product p WHERE p.stock <= 0")
    List<Product> findOutOfStockProducts();
}
