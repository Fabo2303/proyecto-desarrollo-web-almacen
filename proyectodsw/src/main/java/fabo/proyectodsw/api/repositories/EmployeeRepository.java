package fabo.proyectodsw.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fabo.proyectodsw.api.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
    Optional<Employee> findByDni(int dni);
    Optional<Employee> findById(int id);
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByPhone(String phone);
    Optional<Employee> findByName(String name);
    List<Employee> findTop10ByOrderByNameAsc();
}
