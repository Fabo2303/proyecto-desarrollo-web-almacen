import React, { useState } from "react";
import type { Uemail } from "../api/UemailApi.ts";
import { login, saveUemail } from "../api/UemailApi.ts";
import Input from "./Input.tsx";
import Label from "./Label.tsx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        console.log(email)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        console.log(password)
    }

    const inicio = async () => {
        const uemail = await login(email, password);
        if (uemail) {
            localStorage.setItem('mail', uemail.email);
            window.location.href = "/message";
        }
    }

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl flex-col text-center bg-yellow-600 p-3">
            <h1 >Inicie sesion</h1>
            <div className="flex flex-col">
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" name="email" placeholder="email" onChange={handleEmailChange} required>
                </Input>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder="password" onChange={handlePasswordChange} required>
                </Input>
            </div>
            <button className="my-5" onClick={inicio}>Loggin</button>
        </div>
    );
}