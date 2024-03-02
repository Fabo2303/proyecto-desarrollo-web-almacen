package fabo.proyectodsw.util;

import java.util.List;
import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    EMPLOYEE(Arrays.asList(Permission.READ_ALL_PRODUCTS, Permission.SAVE_ONE_PRODUCT)),
    ADMIN(Arrays.asList(Permission.READ_ALL_USERS, Permission.READ_ALL_PRODUCTS, Permission.SAVE_ONE_PRODUCT, Permission.UPDATE_ONE_PRODUCT, Permission.SAVE_INPUT, Permission.SAVE_OUTPUT, Permission.SAVE_EMPLOYEE, Permission.READ_ALL_EMPLOYEES, Permission.READ_ALL_PROVIDERS));

    private List<Permission> permissions;

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}
