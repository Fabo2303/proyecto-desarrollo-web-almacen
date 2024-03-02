import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  verifyCode: (code: string) => void;
}

const ModalMessage: React.FC<ModalProps> = ({ isOpen, title, onClose, verifyCode }) => {
  if (!isOpen) return null;

  const [code, setCode] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  }

  const handleVerifyCode = () => {
    verifyCode(code);
  }

  return (
    <div className="fixed flex z-10 top-0 left-0 w-full h-full bg-black/25 items-center justify-center">
      <div className="relative bg-zinc-300 min-w-[400px] min-h-[400px] rounded-lg">
        <span className="absolute top-[0.2rem] right-[0.5rem] text-2xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
        <h1 className="absolute left-[50%] translate-x-[-50%] top-5 text-2xl text-red-700 font-bold text-center">
          {title}
        </h1>
        <div className="absolute top-[50%] translate-y-[-50%] text-balance text-center text-3xl left-[50%] translate-x-[-50%]">
          <input type="text" placeholder="0000" className="text-center bg-zinc-300 rounded-lg" onChange={handleInputChange} />
          <button className="text-center bg-red-700 rounded-lg mt-10" onClick={handleVerifyCode}>Verificar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;