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

import fabo.proyectodsw.api.entities.Input;
import fabo.proyectodsw.api.services.InputService;

@RestController
@CrossOrigin
@RequestMapping("/api/inputs")
public class InputController {
    @Autowired
    private InputService inputService;

    @PostMapping("save")
    public Input save(@RequestBody Input input) {
        input.setDate(new java.sql.Date(System.currentTimeMillis()));
        return inputService.save(input);
    }

    @GetMapping("findAll")
    public List<Input> findAll() {
        return inputService.findAll();
    }

    @GetMapping("findById/{id}")
    public Input findById(@PathVariable int id) {
        return inputService.findById(id).orElse(null);
    }
}
