import type { Output } from "./OutPut";
import type { Product } from "./Product";

export type OutputDetail = {
    id : number;
    output : Output;
    product : Product;
    quantity : number;
}

export async function saveOutputDetail(jwt: string, outputDetail: OutputDetail) {
    try {
        const response = await fetch(`http://localhost:8080/api/outputDetail/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(outputDetail)
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