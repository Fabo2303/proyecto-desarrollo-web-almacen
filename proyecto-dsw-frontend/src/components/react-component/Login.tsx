import Input from "./Input";
import Label from "./Label";
import React, { useState } from "react";
import { login, updatePassword } from "../../api/User.ts";
import ModalMessage from "../modal/ModalMessage.tsx";
import { sendCodeVerification } from "src/api/SendMessage.ts";
import ModalVerification from "../modal/ModalVerification.tsx";


export default function Formulario() {

    const [form, setForm] = useState({ username: '', password: '' });
    const [formChange, setFormChange] = useState({ usernameChange: '', emailChange: '' });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [error, setError] = useState('');
    const [codigoVerificacion, setCodigoVerificacion] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [olvideContraseña, setOlvideContraseña] = useState(false);
    const [openModalVerification, setOpenModalVerification] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleInputChangeUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormChange({ ...formChange, usernameChange: event.target.value });
        console.log(formChange);
    }
    
    const handleInputChangeEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormChange({ ...formChange, emailChange: event.target.value });
        console.log(formChange);
    }
    
    const handleInputChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
        console.log(formChange);
    }
    
    const handleInputChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        console.log(formChange);
    }
    

    function validarUsuarioYContraseña(username: string, password: string): boolean {
        if (!username || username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setError('El usuario no cumple las caracteristicas deseadas.');
            return false;
        }

        /*if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) || !/\d/.test(password)) {
            setError('La contraseña no cumple las caracteristicas deseadas.');
            return false;
        }*/
        return true;
    }

    const handleLogin = async () => {
        const username = form.username;
        const password = form.password;
        if (!validarUsuarioYContraseña(username, password)) {
            return openModal();
        }
        login(username, password).then((jwt) => {
            if (jwt) {
                localStorage.setItem('jwt', jwt);
                window.location.href = "/menu";
            }
        }
        ).catch((error) => {
            setError(error.message);
            console.log(error);
            openModal();
        });
    }

    const handleLoginChange = async () => {
        const username = formChange.usernameChange;
        const email = formChange.emailChange;
        if (!username || username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setError('El usuario no cumple las caracteristicas deseadas.');
            return openModal();
        }
        if (!email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setError('El correo no cumple las caracteristicas deseadas.');
            return openModal();
        }

        codeVerification(email);
    }

    const handleLoginChangePassword = async () => {
        const password = newPassword;
        const confirmar = confirmPassword;
        if (password !== confirmar) {
            setError('Las contraseñas no coinciden.');
            return openModal();
        }
        console.log(formChange.usernameChange, password)
        updatePassword(formChange.usernameChange, password).then(() => {
            window.location.href = "/login";
        })
    }

    const codeVerification = async (email: any) => {
        const codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        setCodigoVerificacion(codigo.toString());
        sendCodeVerification(email, codigo.toString()).then(() => {
            setOpenModalVerification(true);
        })
    }

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
        setOpenModalVerification(false);
    }

    const verifyCode = (code: string) => {
        if (codigoVerificacion === code) {
            console.log("Código correcto.")
            setChangePassword(true);
            closeModal();
        } else {
            closeModal();
            setError('El código de verificación no es correcto.');
            openModal();
        }
    }

    const changeState = () => {
        setOlvideContraseña(!olvideContraseña);
    }


    return (
        <div>
            <ModalMessage isOpen={isOpenModal} onClose={closeModal} title="Error" message={error}></ModalMessage>
            <ModalVerification isOpen={openModalVerification} onClose={closeModal} title="Ingrese el código de verificación" verifyCode={verifyCode}></ModalVerification>
            {
                !olvideContraseña ?
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-yellow-600 p-5 flex flex-col gap-5 rounded-xl">
                        <h1 className="text-center text-2xl text-pretty text-zinc-900">Ingrese su usuario y contraseña</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <Label htmlFor="username">Usuario</Label>
                                <Input type="text" id="username" name="username" placeholder="usuario" onChange={handleInputChange} required>
                                </Input>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input type="password" id="password" name="password" placeholder="********" onChange={handleInputChange} required>
                                </Input>
                            </div>
                            <button className="text-center bg-red-700 rounded-lg" onClick={handleLogin}>Ingresar</button>
                        </form>
                        <button className="text-center bg-transparent rounded-lg text-zinc-900 hover:text-blue-900" onClick={changeState}>
                            Olvide mi contraseña
                        </button>
                    </div>
                    :
                    !changePassword ?
                        <div>
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-yellow-600 p-5 flex flex-col gap-5 rounded-xl">
                                <h1 className="text-center text-2xl text-pretty text-zinc-900">Ingrese su usuario y correo</h1>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <Label htmlFor="usernameChange">Usuario</Label>
                                        <Input type="text" id="usernameChange" name="usernameChange" placeholder="usuario" onChange={handleInputChangeUsernameChange} required>
                                        </Input>
                                    </div>
                                    <div className="flex flex-col">
                                        <Label htmlFor="emailChange">Correo</Label>
                                        <Input type="email" id="emailChange" name="emailChange" placeholder="empleado@almacen.com" onChange={handleInputChangeEmailChange} required>
                                        </Input>
                                    </div>
                                    <button className="text-center bg-red-700 rounded-lg" onClick={handleLoginChange}>Enviar Código de verificación</button>
                                </form>
                                <button className="text-center bg-transparent rounded-lg text-zinc-900 hover:text-blue-900">
                                    Regresar al login
                                </button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-yellow-600 p-5 flex flex-col gap-5 rounded-xl">
                                <h1 className="text-center text-2xl text-pretty text-zinc-900">Ingrese su nueva contraseña</h1>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                        <Input type="password" id="newPassword" name="newPassword" placeholder="*******" onChange={handleInputChangeNewPassword} required>
                                        </Input>
                                    </div>
                                    <div className="flex flex-col">
                                        <Label htmlFor="confirmPassword">Verificar Contraseña</Label>
                                        <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="*******" onChange={handleInputChangeConfirmPassword} required>
                                        </Input>
                                    </div>
                                    <button className="text-center bg-red-700 rounded-lg" onClick={handleLoginChangePassword}>Cambiar contraseña </button>
                                </form>
                            </div>
                        </div>
            }
        </div>
    );
}