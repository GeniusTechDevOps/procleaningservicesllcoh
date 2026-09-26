import { useState } from "react";
// import Form from "../contact/Form";
import type { RootObject } from "../../interfaces/dbData";

interface ToggleButtonProps {
  data: RootObject;
}

const ToggleButton = ({ data }: ToggleButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {/* Botón para abrir/cerrar el panel */}
      <div
        className="flex items-center gap-2 cursor-pointer text-white px-3 py-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: data.colors.primaryColor,
        }}
      >
        <span className="text-[14px] font-bold">Request a Quote</span>
        <i className="fas fa-file-signature text-xl cursor-pointer rounded-md" aria-hidden={true}></i>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-500 ease-in-out"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Panel lateral */}
      <div
        className={`fixed -top-4 -right-10 md:w-[30%] w-[90%] h-screen bg-white shadow-md transform transition-transform duration-500 ease-in-out overflow-y-scroll content_scroll ${isOpen ? "-translate-x-[0vw]" : "translate-x-full"
          }`}
      >
        {/* Contenido del panel */}
        <div className="px-4 py-6 text-center">
          <i
            className="fas fa-times text-3xl cursor-pointer text-white p-2 rounded-md absolute top-2 left-2"
            style={{ backgroundColor: data.colors.secondaryColor }}
            onClick={() => setIsOpen(false)}
            aria-hidden={true}
          ></i>

          <img
            src={data.logos.secondary}
            alt="logo"
            className="w-[200px] mx-auto"
          />
          <h1 className="mt-4 text-[20px] font-bold text-gray-800">
            Request a Quote
          </h1>
          {/* <Form data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
