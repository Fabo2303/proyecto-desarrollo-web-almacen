import Input from '@react-component/Input';
import Label from '@react-component/Label';
import React, { useEffect, useState} from 'react'
import { saveEmployee, type Employee } from 'src/api/Employee';
import { chooseFetch, type Product } from 'src/api/Product';
import { saveProvider, type Provider } from 'src/api/Provider';
import { saveProviderProduct, type ProviderProduct } from 'src/api/ProviderProduct';
import { saveUser, type User } from 'src/api/User';

interface ModalProviderProps {
    isOpen: boolean;
    onClose: () => void;
    data: Record<string, any>;
    columns: string[];
    title: string;
    nuevo: boolean;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ isOpen, onClose, data, columns, title, nuevo }) => {

    if (!isOpen) return null;

    const [employeeData, setEmployeeData] = useState<Record<string, any>>();
    const [employeeSaved, setEmployeeSaved] = useState<Employee>();
    const [product, setProduct] = useState('');

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
        setProduct(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            if (nuevo) {
                const proveedor = await saveProvider(jwt, employeeData as Provider);
                console.log(proveedor);
                const producto : Product[] = await chooseFetch(jwt, { option: 'sku', value: product });
                console.log(producto);
                const providerProduct : ProviderProduct = {
                    id: 0,
                    provider: proveedor,
                    product: producto[0],
                }
                saveProviderProduct(jwt, providerProduct)
                    .then((employee) => {
                        setEmployeeSaved(employee);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            } else {
                saveProvider(jwt, employeeData as Provider)
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
                                            type={'text'}
                                            id={column}
                                            name={column}
                                            value={employeeData?.[column] ?? ''}
                                            onChange={handleInputChange}
                                            readOnly={((column === 'ruc' || column === 'businessName' || column === 'email') && !nuevo)}
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
                                            <Label htmlFor="username">Producto(SKU)</Label>
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={product}
                                                onChange={handleUserChange}
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

export default ModalProvider