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

import fabo.proyectodsw.api.entities.Provider;
import fabo.proyectodsw.api.services.ProviderService;

@RestController
@CrossOrigin
@RequestMapping("/api/provider")
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @PostMapping("save")
    public Provider save(@RequestBody Provider provider) {
        return providerService.save(provider);
    }

    @GetMapping("findAll")
    public List<Provider> findAll() {
        return providerService.findAll();
    }

    @GetMapping("findTop10ByOrderByBusinessNameAsc")
    public List<Provider> findTop10ByOrderByBusinessNameAsc() {
        return providerService.findTop10ByOrderByBusinessNameAsc();
    }

    @GetMapping("findById/{id}")
    public Provider findById(@PathVariable int id) {
        return providerService.findById(id);
    }

    @GetMapping("findByRuc/{ruc}")
    public Provider findByRuc(@PathVariable String ruc) {
        return providerService.findByRuc(ruc);
    }

    @GetMapping("findByBusinessName/{businessName}")
    public Provider findByBusinessName(@PathVariable String businessName) {
        return providerService.findByBusinessName(businessName);
    }

    @GetMapping("findByPhone/{phone}")
    public Provider findByPhone(@PathVariable String phone) {
        return providerService.findByPhone(phone);
    }

    @GetMapping("findByEmail/{email}")
    public Provider findByEmail(@PathVariable String email) {
        return providerService.findByEmail(email);
    }

    @GetMapping("findByNameEmployee/{nameEmployee}")
    public Provider findByNameEmployee(@PathVariable String nameEmployee) {
        return providerService.findByNameEmployee(nameEmployee);
    }

    @GetMapping("findByAddress/{address}")
    public Provider findByAddress(@PathVariable String address) {
        return providerService.findByAddress(address);
    }

    @GetMapping("findByActive/{active}")
    public Provider findByActive(@PathVariable boolean active) {
        return providerService.findByActive(active);
    }

    @PostMapping("update")
    public Provider update(@RequestBody Provider provider) {
        return providerService.update(provider);
    }
    
}
