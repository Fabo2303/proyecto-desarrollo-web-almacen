import React, { useEffect, useState } from "react";
import type { Message } from "../api/MessageApi.ts";
import { getMessages } from "../api/MessageApi.ts";

export default function Messages() {

    const [messages, setMessages] = useState<Message[]>([]);

    const getMessage = async () => {
        const email = localStorage.getItem('mail');
        if (email) {
            const messages = await getMessages(email);
            setMessages(messages);
        } else {
            window.location.href = "/login";
        }

    }

    useEffect(() => {
        getMessage();
    })

    return (
        <div>
            <h1 className="text-center text-zinc-200 text-2xl">Bandeja de mensajes</h1>
            <div className="gap-3 p-2 flex flex-wrap">
                {messages.map((message) => (
                    <div key={message.id} className="bg-emerald-300 rounded-xl p-4 w-fit">
                        <h3> <span className="font-bold">Subject: </span>{message.subject}</h3>
                        <p className="text-md mt-3">{message.message}</p>
                        <h5 className="text-sm mt-3"><span className="font-bold">From: </span> {message.sender}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}