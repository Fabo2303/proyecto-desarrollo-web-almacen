import Input from '@react-component/Input';
import Label from '@react-component/Label';
import React, { useEffect, useState } from 'react'
import { saveEmployee, type Employee } from 'src/api/Employee';
import { saveUser, type User } from 'src/api/User';

interface ModalProductProps {
    isOpen: boolean;
    onClose: () => void;
    data: Record<string, any>;
    columns: string[];
    title: string;
    nuevo: boolean;
}

const ModalProduct: React.FC<ModalProductProps> = ({ isOpen, onClose, data, columns, title, nuevo }) => {

    if (!isOpen) return null;

    const [employeeData, setEmployeeData] = useState<Record<string, any>>();
    const [user, setUser] = useState<User>({
        id: 0,
        username: '',
        password: '',
        role: 'EMPLOYEE',
        employee: {
            id: 0,
            dni: '',
            name: '',
            lastName: '',
            birthDate: new Date,
            admissionDate: new Date,
            email: '',
            phone: '',
            sex: '',
            image: ''
        }
    });
    const [employeeSaved, setEmployeeSaved] = useState<Employee>();

    useEffect(() => {
        setEmployeeData(data);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeData((prevProduct) => ({
            ...prevProduct,
            [event.target.name]: event.target.value
        }));
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            if (nuevo) {
                const empleado = await saveEmployee(jwt, employeeData as Employee);
                const usuario = await saveUser(jwt, { ...user, employee: empleado });
                console.log(usuario);
            } else {
                saveEmployee(jwt, employeeData as Employee)
                    .then((employee) => {
                        setEmployeeSaved(employee);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        }
        onClose();
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month: string | number = today.getMonth() + 1;
        let day: string | number = today.getDate() + 10;

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="fixed flex z-10 top-0 left-0 w-full h-full bg-black/25 items-center justify-center">
            <div className={`relative bg-zinc-300 ${nuevo ? "min-w-[500px] min-h-[800px]" : "min-w-[500px] min-h-[600px]"} rounded-lg`}>
                <span className="absolute top-[0.2rem] right-[0.5rem] text-3xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
                <h1 className="absolute left-[50%] translate-x-[-50%] top-2 text-4xl text-red-700 font-bold">
                    {title}
                </h1>
                <form onSubmit={handleSubmit}>
                    <table className="absolute top-[30%] translate-y-[-30%] text-balance text-left text-xl left-[50%] translate-x-[-50%]">
                        <tbody>
                            {columns.map((column, index) => (
                                <tr key={index}>
                                    <td>
                                        <Label htmlFor={column}>{column}</Label>
                                    </td>
                                    <td>
                                        <Input
                                            type={column === 'birthDate' ? 'date' : column === 'admissionDate' ? 'date' : 'text'}
                                            id={column}
                                            name={column}
                                            value={employeeData?.[column] ?? ''}
                                            {...(column === 'admissionDate' && { pattern: '\\d{4}-\\d{2}-\\d{2}' })}
                                            {...(column === 'admissionDate' && { min: getCurrentDate() })}
                                            onChange={handleInputChange}
                                            readOnly={((column === 'dni' || column === 'admissionDate' || column === 'email' || column === 'sex') && !nuevo)}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="absolute top-[85%] translate-y-[-85%] text-balance text-left text-xl left-[50%] translate-x-[-50%]">
                        <tbody>
                        {nuevo ?
                                <div>
                                    <tr>
                                        <td>
                                            <Label htmlFor="username">Username</Label>
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={user?.username ?? ''}
                                                onChange={handleUserChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Label htmlFor="password">Password</Label>
                                        </td>
                                        <td>
                                            <Input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={user?.password ?? ''}
                                                onChange={handleUserChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Label htmlFor="role">Role</Label>
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                id="role"
                                                name="role"
                                                value="EMPLOYEE"
                                                readOnly={true}
                                                required
                                            />
                                        </td>
                                    </tr>
                                </div>
                                : null}
                        </tbody>
                    </table>
                    <button className="absolute text-xl left-[50%] translate-x-[-50%] bottom-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-blue-600" type="submit" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ModalProduct