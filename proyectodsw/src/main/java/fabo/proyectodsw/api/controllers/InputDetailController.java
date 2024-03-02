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

import fabo.proyectodsw.api.entities.InputDetail;
import fabo.proyectodsw.api.services.InputDetailService;

@RestController
@CrossOrigin
@RequestMapping("/api/inputDetail")
public class InputDetailController {
    @Autowired
    private InputDetailService inputDetailService;

    @PostMapping("save")
    public InputDetail save(@RequestBody InputDetail inputDetail) {
        return inputDetailService.save(inputDetail);
    }

    @GetMapping("findAll")
    public List<InputDetail> findAll() {
        return inputDetailService.findAll();
    }

    @GetMapping("findById/{id}")
    public InputDetail findById(@PathVariable int id) {
        return inputDetailService.findById(id).orElse(null);
    }
}
