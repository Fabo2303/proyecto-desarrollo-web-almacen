export type Product = {
    id: number;
    sku: string;
    name: string;
    description: string;
    category: string;
    createdAt: Date;
    expiration: Date;
    stock: number;
    brand: string;
    image: string;
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

export async function saveProduct(jwt: string, product: Product) {
    try {
        const response = await fetch(`http://localhost:8080/api/product/saveorupdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(product)
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

export async function stockOutput(jwt: string, product: Product) {
    try {
        const response = await fetch(`http://localhost:8080/api/product/stockOutput`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(product)
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
        case 'sku':
            url = `http://localhost:8080/api/product/findBySku/${criteria.value}`;
            break;
        case 'name':
            url = `http://localhost:8080/api/product/findByName/${criteria.value}`;
            break;
        case 'category':
            url = `http://localhost:8080/api/product/findByCategory/${criteria.value}`;
            break;
        case 'brand':
            url = `http://localhost:8080/api/product/findByBrand/${criteria.value}`;
            break;
        case 'expiration':
            url = 'http://localhost:8080/api/product/findExpiredProducts';
            break;
        case 'stock':
            url = 'http://localhost:8080/api/product/findOutOfStockProducts';
            break;
        default:
            url = 'http://localhost:8080/api/product/findTop10ByOrderByNameAsc';
            break;
    }
    return await fetchToApi(jwt, url);
}