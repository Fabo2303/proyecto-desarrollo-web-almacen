import React, { useEffect, useState } from "react";
import { chooseFetch, stockOutput } from "src/api/Product";
import type { Product } from "src/api/Product";
import TableCustom from "src/components/react-component/Table.tsx";
import ModalMessage from "../modal/ModalMessage";
import ModalDocument from "../modal/ModalDocument";
import ModalProduct from "../modal/ModalProduct";
import ModalListProduct from "../modal/ModalListProduct";
import { findByUsername } from "src/api/User";
import { getDataUser, type UserPayload } from "src/api/Payload";
import { saveOutput } from "src/api/OutPut";
import { saveOutputDetail } from "src/api/OutputDetail";

const TableSalida = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [data, setData] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>();
    const [nuevo, setNuevo] = useState(false);
    const [list, setList] = useState<Product[]>([]);
    const [isOutput, setIsOutput] = useState(false);
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

    const handleSearch = async (searchColumn: string, searchText: string) => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: searchColumn, value: searchText }).then((dat) => {
                setData(dat);
                setError('');
            }).catch((error: any) => {
                setNuevo(true);
                openModal('Product');
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

    const guardarEnLista = (product: Product) => {
        setList([...list, product]);
        setIsOutput(true);
    }

    const handleList = () => {
        openModal('List');
    }
    
    const handleDocument = () => {
        openModal('Document');
        fetching();
    }

    const fetching = async () => {
        const jwt = localStorage.getItem('jwt');
        const userPayload : UserPayload = getDataUser();
        if (jwt) {
            findByUsername(jwt, userPayload.name).then((user) => {
                saveOutput(jwt, {id: 0, date : new Date(), description: 'Salida de productos', user: user}).then((output) => {
                    list.map((producto) => {
                        stockOutput(jwt, producto).then((product) => {
                            saveOutputDetail(jwt, {id: 0, output: output, product: product, quantity: producto.stock}).then((inputDetail) => {
                                console.log(inputDetail);
                            })
                        })
                    })
                })
            }).catch((error: any) => {
                console.log(error.message);
            });
        }
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    const rowClassName = (row: any) => {
        if (new Date(row.expiration) <= today || row.stock === 0) {
            return "bg-red-700 text-white";
        } else {
            return "bg-white";
        }
    };

    const handleButton = (row: any) => {
        if(row.expiration <= today || row.stock === 0) {
            openModal('Error');
            setError('El producto no está apto para la salida.');
            return;
        }
        setProduct(row);
        openModal('Product');
    }

    const onDataChange = (newList: Product[]) => {
        setList(newList);
    }

    return (
        <div className="relative w-full h-full">
            <ModalMessage isOpen={isOpenModal && modalType === 'Error'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalMessage isOpen={isOpenModal && modalType === 'Aviso'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalProduct isOpen={isOpenModal && modalType === 'Product'} onClose={closeModal} data={product || {}} columns={['sku', 'name', 'category', 'brand', 'expiration', 'stock']} title="Producto" nuevo={nuevo} guardarEnLista={guardarEnLista} origin={false}></ModalProduct>
            <ModalDocument isOpen={isOpenModal && modalType === 'Document'} onClose={closeModal} data1={list} headers={["sku", "name", "category", "brand", "expiration", "stock"]} title1="Salidas"/>
            <ModalListProduct isOpen={isOpenModal && modalType === 'List'} onClose={closeModal} title="Lista de salidas" data={list} onDataChange={onDataChange} handleDocument={handleDocument}/>
            <TableCustom data={data} columns={columns} handleSearch={handleSearch} rowClassName={rowClassName} btnfunction={handleButton} >
                {
                    isOutput && <button onClick={handleList} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Lista de salida</button>
                }
            </TableCustom>
        </div>
    );
}

export default TableSalida