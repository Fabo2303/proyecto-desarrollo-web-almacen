import React, { useEffect, useState } from "react";
import { chooseFetch, type Employee} from "src/api/Employee";
import TableCustom from "src/components/react-component/Table.tsx";
import ModalMessage from "../modal/ModalMessage";
import ModalEmployee from "../modal/ModalEmployee";

const TableEmpleado = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [data, setData] = useState<Employee[]>([]);
    const [employee, setEmployee] = useState<Employee>();
    const [nuevo, setNuevo] = useState(false);
    const columns: string[] = ["dni", "name", "email", "phone"];
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
        setEmployee({ id: 0, dni: '', name: '', lastName: '', email: '', phone: '', birthDate: new Date(), admissionDate: new Date(), sex: '', image: ''});
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
            <ModalEmployee isOpen={isOpenModal && modalType === 'Datos'} onClose={closeModal} title={modalType} data={employee || {}} columns={["dni", "name", "lastName", "birthDate", "admissionDate", "email", "phone", "sex"]} nuevo={nuevo}></ModalEmployee>
            <TableCustom data={data} columns={columns} handleSearch={handleSearch} rowClassName={rowClassName} btnfunction={handleButton} >
                {
                    <button onClick={addEmployee} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-yellow-600">Agregar Empleado</button>
                }
            </TableCustom>
        </div>
    );
}

export default TableEmpleado