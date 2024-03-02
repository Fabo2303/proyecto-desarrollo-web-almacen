export type Provider = {
    id: number;
    businessName: string;
    ruc: string;
    nameEmployee: string;
    address: string;
    phone: string;
    email: string;
    active: boolean;
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

export async function saveProvider(jwt: string, provider: Provider) {
    try {
        const response = await fetch(`http://localhost:8080/api/provider/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(provider)
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
            url = `http://localhost:8080/api/provider/findByDni/${criteria.value}`;
            break;
        case 'email':
            url = `http://localhost:8080/api/provider/findByEmail/${criteria.value}`;
            break;
        case 'phone':
            url = `http://localhost:8080/api/provider/findByPhone/${criteria.value}`;
            break;
        case 'name':
            url = `http://localhost:8080/api/provider/findByName/${criteria.value}`;
            break;
        default:
            url = 'http://localhost:8080/api/provider/findTop10ByOrderByBusinessNameAsc';
            break;
    }
    return await fetchToApi(jwt, url);
}