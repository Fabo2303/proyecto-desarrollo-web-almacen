import Input from '@react-component/Input';
import Label from '@react-component/Label';
import React, { useEffect, useState } from 'react'
import { type Product } from 'src/api/Product';

interface ModalProductProps {
    isOpen: boolean;
    onClose: () => void;
    data: Record<string, any>;
    columns: string[];
    title: string;
    nuevo: boolean;
    guardarEnLista: (product: Product) => void;
    origin: boolean;
}

const ModalProduct: React.FC<ModalProductProps> = ({ isOpen, onClose, data, columns, title, nuevo, guardarEnLista, origin}) => {

    if (!isOpen) return null;

    const [product, setProduct] = useState<Record<string, any>>();

    useEffect(() => {
        setProduct(data);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        guardarEnLista(product as Product);
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
            <div className="relative bg-zinc-300 min-w-[450px] min-h-[450px] rounded-lg">
                <span className="absolute top-[0.2rem] right-[0.5rem] text-3xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
                <h1 className="absolute left-[50%] translate-x-[-50%] top-2 text-4xl text-red-700 font-bold">
                    {title}
                </h1>
                <form onSubmit={handleSubmit}>
                    <table className="absolute top-[50%] translate-y-[-50%] text-balance text-left text-xl left-[50%] translate-x-[-50%]">
                        <tbody>
                            {columns.map((column, index) => (
                                <tr key={index}>
                                    <td>
                                        <Label htmlFor={column}>{column}</Label>
                                    </td>
                                    <td>
                                        <Input
                                            type={column === 'expiration' ? 'date' : column === 'stock' ? 'number' : 'text'}
                                            id={column}
                                            name={column}
                                            value={product?.[column] ?? ''}
                                            {...(column === 'expiration' && { pattern: '\\d{4}-\\d{2}-\\d{2}' })}
                                            {...(column === 'expiration' && { min: getCurrentDate() })}
                                            {...(column === 'stock' && { min: 0 })}
                                            onChange={handleInputChange}
                                            readOnly={((column === 'sku' || column === 'name' || column === 'category' || column === 'brand') && !nuevo) ||
                                            (!origin && column == 'expiration')}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="absolute text-xl left-[50%] translate-x-[-50%] bottom-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-blue-600" type="submit" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ModalProduct