import React, { useEffect, useState } from "react";
import { chooseFetch } from "src/api/Product";
import type { Product } from "src/api/Product";
import TableCustom from "src/components/react-component/Table.tsx";
import ModalMessage from "../modal/ModalMessage";
import ModalDocument from "../modal/ModalDocument";


function TableInventario() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [data, setData] = useState<Product[]>([]);
    const [dataFaltantes, setDataFaltantes] = useState<Product[]>([]);
    const [dataVencidos, setDataVencidos] = useState<Product[]>([]);
    const [expiredFaltante, setExpiredFaltante] = useState(false);
    const columns: string[] = ["sku", "name", "category", "brand", "expiration", "stock"];
    const today = new Date();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: '', value: '' })
                .then(dataProductos => {
                    setLoading(false);
                    setData(dataProductos);
    
                    if (dataProductos.length === 0) {
                        openModal('Error');
                        setError('No se encontraron productos.');
                    }
                })
                .catch(err => {
                    openModal('Aviso');
                    setLoading(false);
                    setError(err.message);
                });
        }
    }, []);
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: 'expiration', value: '' })
                .then(datVencidos => {
                    if (datVencidos) {
                        setDataVencidos(datVencidos);
                        setExpiredFaltante(true);
                    }
                })
                .catch(err => {
                    openModal('Aviso');
                    setLoading(false);
                    setError(err.message);
                });
        }
    }, []);
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: 'stock', value: '' })
                .then(datFaltantes => {
                    if (datFaltantes) {
                        setDataFaltantes(datFaltantes);
                        setExpiredFaltante(true);
                    }
                })
                .catch(err => {
                    openModal('Aviso');
                    setLoading(false);
                    setError(err.message);
                });
        }
    }, []);
    

    const handleSearch = async (searchColumn: string, searchText: string) => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: searchColumn, value: searchText }).then((dat) => {
                setData(dat);
                setError('');
            }).catch((error: any) => {
                openModal('Error');
                setError(error.message);
            });
        }
    };

    const openModal = (type: string) => {
        setModalType(type);
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
        setModalType('');
    }

    const handleDocument = () => {
        openModal('Reports');
    }

    const handleButton = (row: any) => {
        console.log(row);
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    if ((dataVencidos.length > 0 || dataFaltantes.length > 0) !== expiredFaltante) {
        setExpiredFaltante(dataVencidos.length > 0 || dataFaltantes.length > 0);
    }

    const rowClassName = (row: any) => {
        if (new Date(row.expiration) <= today || row.stock === 0) {
            return "bg-red-700 text-white";
        } else {
            return "bg-white";
        }
    };

    return (
        <div className="relative w-full h-full">
            <ModalMessage isOpen={isOpenModal && modalType === 'Error'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalMessage isOpen={isOpenModal && modalType === 'Aviso'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalDocument isOpen={isOpenModal && modalType === 'Reports'} onClose={closeModal} data1={dataFaltantes} data2={dataVencidos} headers={columns} title1="faltantes" title2="vencidos"></ModalDocument>
            <TableCustom data={data} columns={columns} handleSearch={handleSearch} rowClassName={rowClassName} btnfunction={handleButton}>
                <div>
                    {
                        expiredFaltante ? (
                            <button onClick={handleDocument} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-blue-600">
                                Generar Reporte
                            </button>
                        ) : <button>hola</button>
                    }
                </div>
            </TableCustom>
        </div>
    );
}

export default TableInventario;