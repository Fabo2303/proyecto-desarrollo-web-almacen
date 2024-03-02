import type { Employee } from "./Employee";

export type User = {
    id: number;
    username: string;
    password: string;
    employee: Employee;
    role: string;
}

export async function login(username: string, password: string) {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        const data = await response.json();
        return data.jwt;
    } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    }
}

export async function dataUser(username: string) {
    const jwt = localStorage.getItem('jwt');
    if (jwt != null) {
        const user = await findByUsername(jwt, username);
        return user;
    }
    return null;
}

export async function findByUsername(jwt: string, username: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/findByUsername/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.json();
    } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    }
}

export async function saveUser(jwt: string, user: User) {
    try {
        const response = await fetch('http://localhost:8080/api/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.json();
    } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    }
}

export async function updatePassword(username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/updatePassword/${username}/${password}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.json();
    } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    }
}