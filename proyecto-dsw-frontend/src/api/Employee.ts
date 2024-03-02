export type Employee = {
    id: number;
    dni: string;
    name: string;
    lastName: string;
    birthDate: Date;
    admissionDate: Date;
    email: string;
    phone: string;
    sex: string;
    image: string;
}

export async function fetchToApi(jwt: string, url: string) {
    try {
        const response = await fetch(url, {
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

export async function saveEmployee(jwt: string, employee: Employee) {
    try {
        const response = await fetch(`http://localhost:8080/api/employee/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(employee)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        return await response.json();
    }catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    }
}

export async function chooseFetch(jwt: string, criteria: { option: string, value: string }) {
    let url;
    switch (criteria.option) {
        case 'dni':
            url = `http://localhost:8080/api/employee/findByDni/${criteria.value}`;
            break;
        case 'email':
            url = `http://localhost:8080/api/employee/findByEmail/${criteria.value}`;
            break;
        case 'phone':
            url = `http://localhost:8080/api/employee/findByPhone/${criteria.value}`;
            break;
        case 'name':
            url = `http://localhost:8080/api/employee/findByName/${criteria.value}`;
            break;
        default:
            url = 'http://localhost:8080/api/employee/findTop10ByOrderByNameAsc';
            break;
    }
    return await fetchToApi(jwt, url);
}