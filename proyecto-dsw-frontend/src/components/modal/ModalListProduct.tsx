import React, { useEffect, useState } from 'react';
import type { Product } from 'src/api/Product';

interface ModalListProductProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: Product[];
    onDataChange: (newData: Product[]) => void;
    handleDocument: () => void;
}

const ModalListProduct: React.FC<ModalListProductProps> = ({ isOpen, onClose, title, data , onDataChange ,handleDocument}) => {
    const [mode, setMode] = useState<'normal' | 'delete' | 'modify'>('normal');
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
    const [list, setList] = useState<Product[]>(data);

    useEffect(() => {
        setList(data);
    }, [data]);

    const handleDelete = () => {
        if (selectedRowIndex == null) {
            alert('No se ha seleccionado un producto');
        } else {
            list.splice(selectedRowIndex, 1);
            setSelectedRowIndex(null);
        }
        setMode('normal');
    };

    const handleModify = () => {
        alert('Modificación realizada');
        onDataChange(list);
        setMode('normal');
    };

    const handleRowClick = (index: number) => {
        if (mode === 'delete') {
            setSelectedRowIndex(index);
            if (index === selectedRowIndex) {
                setSelectedRowIndex(null);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof Product) => {
        const { value } = e.target;
        const newList = [...list];
        newList[index] = { ...newList[index], [fieldName]: value };
        setList(newList);
    };


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

    if (!isOpen) return null;

    return (
        <div className="fixed flex z-10 top-0 left-0 w-full h-full bg-black/25 items-center justify-center">
            <div className="relative bg-zinc-300 min-w-[650px] min-h-[400px] rounded-lg">
                <span className="absolute top-[0.2rem] right-[0.5rem] text-3xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
                <h1 className="absolute left-[50%] translate-x-[-50%] top-5 text-2xl text-red-700 font-bold">
                    {title}
                </h1>
                <div className="absolute top-[20%] translate-y-[-20%] text-sm left-[50%] translate-x-[-50%]">
                    <table className="w-[90%]">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-1 font-bold">SKU</th>
                                <th className="px-4 py-1 font-bold">Nombre</th>
                                <th className="px-4 py-1 font-bold">Stock</th>
                                <th className="px-4 py-1 font-bold">Vencimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((product, index) => (
                                    <tr key={index} className={`bg-white cursor-pointer ${index === selectedRowIndex ? 'bg-yellow-300' : ''}`} onClick={() => handleRowClick(index)}>
                                        <td className="px-4 py-1">{product.sku}</td>
                                        <td className="px-4 py-1 text-nowrap">{product.name}</td>
                                        <td className="px-4 py-1">{mode === 'modify' ? <input type="number" value={product.stock} min={1} onChange={(e) => handleInputChange(e, index, 'stock')} /> : product.stock} </td>
                                        <td className="px-4 py-1">
                                            {mode === 'modify' ? (
                                                <input
                                                    type="date"
                                                    value={new Date(product.expiration).toISOString().split('T')[0]}
                                                    pattern='\\d{4}-\\d{2}-\\d{2}'
                                                    min={getCurrentDate()}
                                                    onChange={(e) => handleInputChange(e, index, 'expiration')}
                                                />
                                            ) : (
                                                new Date(product.expiration).toISOString().split('T')[0]
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {mode === 'normal' && (
                    <>
                        <button className='absolute bottom-5 text-sm left-[25%] translate-x-[-25%] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600' onClick={() => setMode('modify')}>Modificar</button>
                        <button className='absolute bottom-5 text-sm left-[50%] translate-x-[-50%] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600' onClick={() => setMode('delete')}>Eliminar</button>
                        <button className='absolute bottom-5 text-sm left-[80%] translate-x-[-80%] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-nowrap' onClick={handleDocument}>Generar Reporte</button>
                    </>
                )}
                {
                    mode === 'modify' && (
                        <button className='absolute bottom-5 text-sm left-[50%] translate-x-[-50%] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600' onClick={handleModify}>Confirmar Modificación</button>
                    )
                }
                {mode === 'delete' && (
                    <button className='absolute bottom-5 text-sm left-[50%] translate-x-[-50%] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600' onClick={handleDelete}>Confirmar Eliminación</button>
                )}
            </div>
        </div>
    )
}

export default ModalListProduct;
