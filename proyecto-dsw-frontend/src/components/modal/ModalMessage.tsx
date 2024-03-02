import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const ModalMessage: React.FC<ModalProps> = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed flex z-10 top-0 left-0 w-full h-full bg-black/25 items-center justify-center">
            <div className="relative bg-zinc-300 min-w-[400px] min-h-[400px] rounded-lg">
                <span className="absolute top-[0.2rem] right-[0.5rem] text-3xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
                <h1 className="absolute left-[50%] translate-x-[-50%] top-5 text-5xl text-red-700 font-bold">
                    {title}
                </h1>
                <div className="absolute top-[50%] translate-y-[-50%] text-balance text-center text-3xl left-[50%] translate-x-[-50%]">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default ModalMessage;