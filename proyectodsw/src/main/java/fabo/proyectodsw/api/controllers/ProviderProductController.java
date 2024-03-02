package fabo.proyectodsw.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fabo.proyectodsw.api.entities.ProviderProduct;
import fabo.proyectodsw.api.services.ProviderProductService;

@RestController
@CrossOrigin
@RequestMapping("/api/providerProduct")
public class ProviderProductController {
    @Autowired
    private ProviderProductService providerProductService;

    @PostMapping("save")
    public fabo.proyectodsw.api.entities.ProviderProduct save(@RequestBody ProviderProduct providerProduct) {
        return providerProductService.save(providerProduct);
    }

    @GetMapping("findAll")
    public List<ProviderProduct> findAll() {
        return providerProductService.findAll();
    }

    @GetMapping("findById/{id}")
    public ProviderProduct findById(@PathVariable int id) {
        return providerProductService.findById(id).orElse(null);
    }
}
