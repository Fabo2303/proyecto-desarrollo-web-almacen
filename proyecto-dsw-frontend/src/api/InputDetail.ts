import type { Input } from "./Input";
import type { Product } from "./Product";

export type InputDetail = {
    id : number;
    input : Input;
    product : Product;
    quantity : number;
}

export async function saveInputDetail(jwt: string, inputDetail: InputDetail) {
    try {
        const response = await fetch(`http://localhost:8080/api/inputDetail/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(inputDetail)
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