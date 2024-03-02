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

import fabo.proyectodsw.api.entities.OutputDetail;
import fabo.proyectodsw.api.services.OutputDetailService;

@RestController
@CrossOrigin
@RequestMapping("/api/outputDetail")
public class OutputDetailController {
    @Autowired
    private OutputDetailService outputDetailService;

    @PostMapping("save")
    public OutputDetail save(@RequestBody OutputDetail outputDetail) {
        return outputDetailService.save(outputDetail);
    }

    @GetMapping("findAll")
    public List<OutputDetail> findAll() {
        return outputDetailService.findAll();
    }

    @GetMapping("findById/{id}")
    public OutputDetail findById(@PathVariable int id) {
        return outputDetailService.findById(id);
    }
}
