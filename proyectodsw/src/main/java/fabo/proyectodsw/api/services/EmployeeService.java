package fabo.proyectodsw.api.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fabo.proyectodsw.api.entities.Employee;
import fabo.proyectodsw.api.repositories.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @SuppressWarnings("null")
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee findById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee findByDni(int dni) {
        return employeeRepository.findByDni(dni).orElse(null);
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email).orElse(null);
    }

    public Employee findByPhone(String phone) {
        return employeeRepository.findByPhone(phone).orElse(null);
    }

    public Employee findByName(String name) {
        return employeeRepository.findByName(name).orElse(null);
    }

    public List<Employee> findTop10ByOrderByNameAsc() {
        return employeeRepository.findTop10ByOrderByNameAsc();
    }

    public Employee update(Employee employeeEdited) {
        Employee employee = employeeRepository.findById(employeeEdited.getId()).orElse(null);
        employee.setDni(employeeEdited.getDni());
        employee.setName(employeeEdited.getName());
        employee.setLastName(employeeEdited.getLastName());
        employee.setBirthDate(employeeEdited.getBirthDate());
        employee.setAdmissionDate(employeeEdited.getAdmissionDate());
        employee.setEmail(employeeEdited.getEmail());
        employee.setPhone(employeeEdited.getPhone());
        employee.setSex(employeeEdited.getSex());
        employee.setImage(employeeEdited.getImage());
        return employeeRepository.save(employee);
    }
}
