package fabo.proyectodsw.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.Product;
import fabo.proyectodsw.api.services.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("saveorupdate")
    public ResponseEntity<?> saveOrUpdateProduct(@RequestBody Product product) {
        if(product == null){
            return ResponseEntity.status(400).body("No se recibió el producto");
        }
        /*if(product.checkProduct()){
            return ResponseEntity.status(400).body("El producto no cumple con los requisitos mínimos para ser guardado");
        }*/
        Product productSaved = productService.findById(product.getId()).orElse(null);
        if (productSaved == null) {
            product.setCreatedAt(new java.sql.Date(System.currentTimeMillis()));
            return ResponseEntity.ok(productService.saveOrUpdate(product));
        }

        productSaved.setExpiration(product.getExpiration());
        productSaved.setStock(productSaved.getStock() + product.getStock());
        return ResponseEntity.ok(productService.saveOrUpdate(productSaved));
    }

    @PostMapping("stockOutput")
    public ResponseEntity<?> stockOutput(@RequestBody Product product) {
        if(product == null){
            return ResponseEntity.status(400).body("No se recibió el producto");
        }
        Product productSaved = productService.findById(product.getId()).orElse(null);
        if (productSaved == null) {
            return ResponseEntity.status(404).body("No existe el producto con el id: " + product.getId() + ". Comuníquese con el administrador del sistema");
        }
        if (productSaved.getStock() < product.getStock()) {
            return ResponseEntity.status(400).body("No hay suficiente stock para realizar la salida");
        }
        productSaved.setStock(productSaved.getStock() - product.getStock());
        return ResponseEntity.ok(productService.saveOrUpdate(productSaved));
    }



    @GetMapping("findAll")
    public ResponseEntity<?> findAll() {
        List<Product> products = productService.findAll();
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {
        Product product = productService.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.status(404)
                    .body("No existe el producto con el id: " + id + ". Comuníquese con el administrador del sistema");
        }
        List<Product> products = List.of(product);
        return ResponseEntity.ok(products);
    }

    @GetMapping("findBySku/{sku}")
    public ResponseEntity<?> findBySku(@PathVariable String sku) {
        Product product = productService.findBySku(sku).orElse(null);
        if (product == null) {
            return ResponseEntity.status(404)
                    .body("No existe el producto con el sku: " + sku + ". Comuníquese con el administrador del sistema");
        }
        List<Product> products = List.of(product);
        return ResponseEntity.ok(products);
    }

    @GetMapping("findByName/{name}")
    public ResponseEntity<?> findByName(@PathVariable String name) {
        List<Product> products = productService.findByName(name);
        if (products == null) {
            return ResponseEntity.status(404)
                    .body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos con ese nombre");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findByCategory/{category}")
    public ResponseEntity<?> findByCategory(@PathVariable String category) {
        List<Product> products = productService.findByCategory(category);
        if (products == null) {
            return ResponseEntity.status(404)
                    .body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos con esa categoría");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findByBrand/{brand}")
    public ResponseEntity<?> findByBrand(@PathVariable String brand) {
        List<Product> products = productService.findByBrand(brand);
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos con esa marca");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findActiveProducts")
    public ResponseEntity<?> findActiveProducts() {
        List<Product> products = productService.findActiveProducts();
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos activos");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findInactiveProducts")
    public ResponseEntity<?> findInactiveProducts() {
        List<Product> products = productService.findInactiveProducts();
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos inactivos");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findTop10ByOrderByNameAsc")
    public ResponseEntity<?> findTop10ByOrderByNameAsc() {
        List<Product> products = productService.findTop10ByOrderByNameAsc();
        if (products == null) {
            return ResponseEntity.status(404).body("\"No se encontraron productos. Comuníquese con el administrador del sistema\"");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findExpiredProducts")
    public ResponseEntity<?> findExpiredProducts() {
        List<Product> products = productService.findExpiredProducts();
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos vencidos");
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("findOutOfStockProducts")
    public ResponseEntity<?> findOutOfStockProducts() {
        List<Product> products = productService.findOutOfStockProducts();
        if (products == null) {
            return ResponseEntity.status(404).body("No se encontraron productos. Comuníquese con el administrador del sistema");
        }
        if (products.isEmpty()) {
            return ResponseEntity.status(404).body("No hay productos sin stock");
        }
        return ResponseEntity.ok(products);
    }
}
