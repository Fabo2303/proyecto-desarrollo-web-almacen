import type {User} from "./User";

export type Output = {
    id: number;
    date: Date;
    description: string;
    user : User;
}

export async function saveOutput(jwt: string, output: Output) {
    try {
        const response = await fetch(`http://localhost:8080/api/outputs/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(output)
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