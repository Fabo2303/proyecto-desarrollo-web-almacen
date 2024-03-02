package fabo.proyectodsw.api.services;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Product;
import fabo.proyectodsw.api.repositories.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    @SuppressWarnings("null")
    public Product saveOrUpdate(Product product) {
        return productRepository.save(product);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    public Optional<Product> findBySku(String sku) {
        return productRepository.findBySku(sku);
    }

    public List<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    public List<Product> findByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> findByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    public List<Product> findActiveProducts() {
        return productRepository.findByActive(true);
    }

    public List<Product> findInactiveProducts() {
        return productRepository.findByActive(false);
    }

    public List<Product> findTop10ByOrderByNameAsc() {
        return productRepository.findTop10ByOrderByNameAsc();
    }

    public List<Product> findExpiredProducts() {
        return productRepository.findExpiredProducts(new Date(System.currentTimeMillis()));
    }

    public List<Product> findOutOfStockProducts() {
        return productRepository.findOutOfStockProducts();
    }
}
