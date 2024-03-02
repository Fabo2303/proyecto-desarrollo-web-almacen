package fabo.proyectodsw.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncryptor {

    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "clave123";
        String encodedPassword = encoder.encode(password);
        System.out.println(encodedPassword);
    }
}
