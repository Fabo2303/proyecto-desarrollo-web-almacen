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

import fabo.proyectodsw.api.entities.Output;
import fabo.proyectodsw.api.services.OutputService;

@RestController
@CrossOrigin
@RequestMapping("/api/outputs")
public class OutputController {
    @Autowired
    private OutputService outputService;

    @PostMapping("save")
    public Output save(@RequestBody Output output) {
        return outputService.save(output);
    }

    @GetMapping("findAll")
    public List<Output> findAll() {
        return outputService.findAll();
    }

    @GetMapping("findById/{id}")
    public Output findById(@PathVariable int id) {
        return outputService.findById(id);
    }
}
