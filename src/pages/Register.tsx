import { useState } from "react";
import Input from "../components/Input";
import Lbutton from "../components/Lbutton";

function Register() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  const tipos = [
    "Cliente",
    "Vendedor",
    "Comprador",
    "Fornecedor",
    "Produção",
    "Administrador",
  ];

  return (
    <div className="bg-[#FCF1DD] min-h-screen min-w-screen flex items-center justify-center font-mono">
      <div className="flex justify-center items-center flex-col gap-8 w-full max-w-4xl px-4">
        <h1 className="font-semibold text-4xl">Criar conta</h1>

        {/* Campo Tipo com Dropdown */}
        <div className="relative w-full max-w-2xl">
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="shadow-lg border border-black/10 rounded-sm p-2 w-full h-[6vh] flex items-center justify-between cursor-pointer">
              <span className={selectedType ? "" : "text-gray-400"}>
                {selectedType || "Tipo"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isHovering && (
              <div className="absolute top-full left-0 w-full pt-1 bg-transparent z-10">
                <div className="bg-[#FCF1DD] shadow-lg border border-black/10 rounded-sm">
                  <div className="p-2 text-gray-400 flex items-center justify-between border-b border-black/10">
                    <span>Tipo</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {tipos.map((tipo) => (
                    <div
                      key={tipo}
                      onClick={() => {
                        setSelectedType(tipo);
                        setIsHovering(false);
                      }}
                      className="p-2 hover:bg-white/50 cursor-pointer"
                    >
                      {tipo}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campos em duas colunas */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
          {/* Coluna Esquerda */}
          <div className="flex flex-col w-full md:w-1/2">
            <Input type="text" placeholder="CPF" className="w-full" />
            <Input type="text" placeholder="Nome pessoal" className="w-full" />
            <Input
              type="date"
              placeholder="Data de nascimento"
              className="w-full"
            />
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col w-full md:w-1/2">
            <Input type="text" placeholder="CNPJ" className="w-full" />
            <Input type="text" placeholder="Nome fantasia" className="w-full" />
            <Input type="text" placeholder="Razão social" className="w-full" />
            <Input type="text" placeholder="IE" className="w-full" />
            <Input
              type="date"
              placeholder="Data de fundação"
              className="w-full"
            />
          </div>
        </div>

        {/* Campos de largura total */}
        <div className="flex flex-col w-full max-w-2xl">
          <Input
            type="text"
            placeholder="Endereço comercial"
            className="w-full"
          />
          <Input
            type="tel"
            placeholder="Número para contato"
            className="w-full"
          />
          <Input type="email" placeholder="E-mail" className="w-full" />
          <Input type="password" placeholder="Senha" className="w-full" />
        </div>

        <Lbutton />
      </div>
    </div>
  );
}

export default Register;
