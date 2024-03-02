import React, { useEffect, useState } from 'react'
import { getDataUser } from 'src/api/Payload';
import { sendCodeVerification } from 'src/api/SendMessage';
import { dataUser, updatePassword, type User } from 'src/api/User';
import ModalVerification from '../modal/ModalVerification';
import Input from './Input';
import Label from './Label';
import ModalMessage from '../modal/ModalMessage';

function DatosUsuario() {
  const [user, setUser] = useState<User>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openModalVerification, setOpenModalVerification] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const username = getDataUser()?.sub
    dataUser(username).then((data) => {
      setUser(data)
    })
  })


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const codeVerification = async () => {
    const codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setCodigoVerificacion(codigo.toString());
    sendCodeVerification(user?.employee.email ?? '', codigo.toString()).then(() => {
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

  const handleInputChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }

  const handleInputChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }

  const handleLoginChangePassword = async () => {
    const password = newPassword;
    const confirmar = confirmPassword;
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return openModal();
    }
    updatePassword(user?.username ?? '', password).then(() => {
      window.location.href = "/login";
    })
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

  return (
    <div>
      <ModalMessage isOpen={isOpenModal} onClose={closeModal} title="Error" message={error}></ModalMessage>
      <ModalVerification isOpen={openModalVerification} onClose={closeModal} title="Ingrese el código de verificación" verifyCode={verifyCode}></ModalVerification>
      {
        !changePassword ?
          <div className="p-3 flex flex-col items-center justify-center gap-y-40">
            <table className="table-auto mt-10">
              <tbody className="text-3xl text-zinc-100">
                <tr>
                  <td className="font-semibold w-2/4">Nombre:</td>
                  <td>{user?.employee.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Apellido:</td>
                  <td>{user?.employee.lastName}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Correo:</td>
                  <td>{user?.employee.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Fecha de Nacimiento:</td>
                  <td>{String(user?.employee.birthDate)}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Fecha de Ingreso:</td>
                  <td>{String(user?.employee.admissionDate)}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">DNI:</td>
                  <td>{user?.employee.dni}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Email:</td>
                  <td>{user?.employee.email}</td>
                </tr>
                <tr>
                  <td className="font-semibold w-2/4">Teléfono:</td>
                  <td>{user?.employee.phone}</td>
                </tr>
              </tbody>
            </table>
            <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-yellow-600" onClick={codeVerification}>
              Cambiar Contraseña
            </button>
          </div>

          : <div>
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
  )
}

export default DatosUsuario