package fabo.proyectodsw.api.entities;

import java.sql.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String sku;
    private String name;
    private String description;
    private String category;
    private Date createdAt;
    private Date expiration;
    private int stock;
    private String brand;
    private String image;
    private boolean active;

    public boolean checkProduct(){
        if (this.sku == null || this.sku.isBlank() || this.sku.substring(0, 3).equals("SKU") == false || this.sku.length() != 6){
            return false;
        }
        if (this.name == null || this.name.isBlank()) {
            return false;
        }
        if (this.category == null || this.category.isBlank()) {
            return false;
        }
        if (this.expiration == null) {
            return false;
        }
        if (this.stock < 0) {
            return false;
        }
        if (this.brand == null || this.brand.isBlank()) {
            return false;
        }
        return true;
    }
}
