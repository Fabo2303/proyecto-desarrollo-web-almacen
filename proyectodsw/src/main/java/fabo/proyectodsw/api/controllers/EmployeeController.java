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

import fabo.proyectodsw.api.entities.Employee;
import fabo.proyectodsw.api.services.EmployeeService;

@RestController
@CrossOrigin
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Employee employee) {
        if(employee == null) {
            return ResponseEntity.status(404).body("No se recibió ningún empleado.");
        }
        Employee employeeSaved = employeeService.findByDni(employee.getDni());
        if(employeeSaved == null) {
            return ResponseEntity.ok(employeeService.save(employee));
        }
        employeeSaved.setName(employee.getName());
        employeeSaved.setLastName(employee.getLastName());
        employeeSaved.setBirthDate(employee.getBirthDate());
        employeeSaved.setPhone(employee.getPhone());
        return ResponseEntity.ok(employeeService.save(employeeSaved));
    }

    @GetMapping("findAll")
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("findById/{id}")
    public Employee findById(@PathVariable int id) {
        return employeeService.findById(id);
    }

    @GetMapping("findByDni/{dni}")
    public Employee findByDni(@PathVariable int dni) {
        return employeeService.findByDni(dni);
    }

    @GetMapping("findByEmail/{email}")
    public Employee findByEmail(@PathVariable String email) {
        return employeeService.findByEmail(email);
    }

    @GetMapping("findByPhone/{phone}")
    public Employee findByPhone(@PathVariable String phone) {
        return employeeService.findByPhone(phone);
    }

    @GetMapping("findByName/{name}")
    public Employee findByName(@PathVariable String name) {
        return employeeService.findByName(name);
    }

    @GetMapping("findTop10ByOrderByNameAsc")
    public List<Employee> findTop10ByOrderByNameAsc() {
        return employeeService.findTop10ByOrderByNameAsc();
    }

    @PostMapping("update")
    public Employee update(@RequestBody Employee employee) {
        return employeeService.update(employee);
    }

}
