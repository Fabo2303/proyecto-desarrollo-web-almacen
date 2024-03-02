import type { Product } from "./Product";
import type { Provider } from "./Provider";

export type ProviderProduct = {
    id: number;
    provider: Provider;
    product : Product;
}

export async function saveProviderProduct(jwt: string, providerProduct: ProviderProduct) {
    try {
        const response = await fetch(`http://localhost:8080/api/providerProduct/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(providerProduct)
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