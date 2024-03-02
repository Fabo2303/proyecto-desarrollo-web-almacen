import type { Uemail } from "./UemailApi.ts";

export type Message = {
    id: number;
    uemail: Uemail;
    sender: string;
    subject: string;
    message: string;
}

export async function getMessages(email : string) : Promise<Message[]>{
    const response = await fetch(`http://localhost:8080/message/get/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}