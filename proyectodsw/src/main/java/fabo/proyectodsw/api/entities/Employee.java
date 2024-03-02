package fabo.proyectodsw.api.entities;

import java.sql.Date;

import jakarta.persistence.Column;
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
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private int dni;

    private String name;
    private String lastName;
    private Date birthDate;
    private Date admissionDate;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phone;

    @Column(columnDefinition = "CHAR(1) CHECK (sex IN ('M', 'F'))")
    private String sex;

    private String image;
}
