import React, { useEffect, useState } from "react";
import { chooseFetch, type Provider } from "src/api/Provider";
import TableCustom from "src/components/react-component/Table.tsx";
import ModalMessage from "../modal/ModalMessage";
import ModalProvider from "../modal/ModalProvider";

const TableProveedor = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [data, setData] = useState<Provider[]>([]);
    const [employee, setEmployee] = useState<Provider>();
    const [nuevo, setNuevo] = useState(false);
    const columns: string[] = ["ruc", "businessName", "email", "phone"];
    const today = new Date();


    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            chooseFetch(jwt, { option: '', value: '' })
                .then(dataEmployees => {
                    setLoading(false);
                    setData(dataEmployees);

                    if (dataEmployees.length === 0) {
                        openModal('Error');
                        setError('No se encontraron Empleados.');
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
                setError(error.message);
                openModal('Error');
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
        setNuevo(false);
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

    const addEmployee = () => {
        setEmployee({ id: 0, businessName: '', ruc: '', nameEmployee: '', address: '', phone: '', email: '', active: true });
        setNuevo(true);
        openModal('Datos');
    }

    const handleButton = (row: any) => {
        setEmployee(row);
        setNuevo(false);
        openModal('Datos');
    }

    return (
        <div className="relative w-full h-full">
            <ModalMessage isOpen={isOpenModal && modalType === 'Error'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalMessage isOpen={isOpenModal && modalType === 'Aviso'} onClose={closeModal} title={modalType} message={error}></ModalMessage>
            <ModalProvider isOpen={isOpenModal && modalType === 'Datos'} onClose={closeModal} title={modalType} data={employee || {}} columns={["ruc", "businessName", "email", "phone", "address", "nameEmployee"]} nuevo={nuevo}></ModalProvider>
            <TableCustom data={data} columns={columns} handleSearch={handleSearch} rowClassName={rowClassName} btnfunction={handleButton} >
                {
                    <button onClick={addEmployee} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-yellow-600">Agregar Proveedor</button>
                }
            </TableCustom>
        </div>
    );
}

export default TableProveedor