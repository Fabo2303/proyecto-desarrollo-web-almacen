CREATE TRIGGER insertar_datos_uemail
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    DECLARE empleado_email VARCHAR(255);
    
    SELECT email INTO empleado_email
    FROM employee
    WHERE id = NEW.employee_id;
    
    INSERT INTO uemail (name, email, password)
    VALUES (NEW.username, empleado_email, NEW.password);
END$$
