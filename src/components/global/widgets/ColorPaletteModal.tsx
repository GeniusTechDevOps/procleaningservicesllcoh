import React from 'react';
import TableColor from './TableColor';



interface ColorPaletteModalProps {
    show: boolean;
    onClose: () => void;
}

const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <>
            <div className="justify-center items-center flex  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-6xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between  p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Color Palettes</h3>
                            <button
                                className="p-1 ml-auto relative bg-transparent border-0 text-black float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onClose}
                                aria-label="Cerrar modal"
                            >
                                X
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto overflow-y-auto h-[70vh] md:h-[500px]">
                            <TableColor />
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default ColorPaletteModal;
