import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Vendedor {
  id: number;
  nome: string;
  cpf: string;
  meta: string;
  status: "Ativo" | "Pendente" | "Inativo" | "Em Revisão";
}

interface FormData {
  nome: string;
  cpf: string;
  meta: string;
  status: "Ativo" | "Pendente" | "Inativo" | "Em Revisão";
}

type FiltroStatus = "todos" | "ativo" | "pendente" | "inativo" | "emrevisão";

export default function Vendedores() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([
    { id: 1, nome: "Ana Silva", cpf: "123.456.789-00", meta: "R$10.000", status: "Ativo" },
    { id: 2, nome: "Bruno Costa", cpf: "123.456.789-00", meta: "R$5.000", status: "Pendente" },
    { id: 3, nome: "Daniel Martins", cpf: "123.456.789-00", meta: "R$7.500", status: "Inativo" },
    { id: 4, nome: "Elena Santos", cpf: "123.456.789-00", meta: "R$12.000", status: "Ativo" },
    { id: 5, nome: "Fernando Lima", cpf: "123.456.789-00", meta: "R$6.800", status: "Em Revisão" },
    { id: 6, nome: "Jorge Mattos", cpf: "123.456.789-00", meta: "R$3.000", status: "Inativo" },
  ]);

  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [vendedorEditando, setVendedorEditando] = useState<Vendedor | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    meta: "",
    status: "Ativo",
  });

  // Função que deixa o filtro "liga/desliga"
  const toggleFiltro = (status: FiltroStatus) => {
    setFiltroStatus((prev) => (prev === status ? "todos" : status));
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Ativo":
        return "bg-green-500";
      case "Pendente":
        return "bg-yellow-500";
      case "Inativo":
        return "bg-red-500";
      case "Em Revisão":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const vendedoresFiltrados = vendedores.filter((v) => {
    if (filtroStatus === "todos") return true;
    return v.status.toLowerCase().replace(" ", "") === filtroStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este vendedor?")) {
      setVendedores(vendedores.filter((v) => v.id !== id));
    }
  };

  const handleEdit = (vendedor: Vendedor) => {
    setVendedorEditando(vendedor);
    setFormData(vendedor);
    setMostrarModal(true);
  };

  const handleNovo = () => {
    setVendedorEditando(null);
    setFormData({ nome: "", cpf: "", meta: "", status: "Ativo" });
    setMostrarModal(true);
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.cpf || !formData.meta) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    if (vendedorEditando) {
      setVendedores(
        vendedores.map((v) => (v.id === vendedorEditando.id ? { ...v, ...formData } : v))
      );
    } else {
      const novoId = Math.max(...vendedores.map((v) => v.id)) + 1;
      setVendedores([...vendedores, { id: novoId, ...formData }]);
    }
    setMostrarModal(false);
  };

  return (
    <div className="flex h-screen bg-[#FAF3E8]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#E8D5B5] border-r border-[#D7C4A4]">
        <div className="p-6 font-medium text-[#4A3F35]">

          {/* LOGO */}
          <div className="flex justify-center mb-10">
            <img 
              src="src/img/logo.png"
              alt="Logo" 
              className="w-60 h-auto"
            />
          </div>

          {/* MENU */}
          <nav className="space-y-2">
            {[
              "Dashboard",
              "Pedidos",
              "Clientes",
              "Produção",
              "Estoque",
              "Vendedores",
              "Compradores",
              "Configurações",
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  item === "Vendedores"
                    ? "bg-[#AF5D2A] text-white font-semibold"
                    : "hover:bg-[#DCC7A6]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-lg font-bold text-[#4A3F35]">Sistema de Gerenciamento</h1>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              Sistema Online
            </span>

            <span className="text-sm text-gray-700">
              {new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </header>

        <div className="p-8">

          {/* STATUS FILTER */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3 text-[#4A3F35] font-medium">
              Status de Qualificação:

              {[
                ["ativo", "Ativo", "bg-green-500"],
                ["pendente", "Pendente", "bg-yellow-500"],
                ["inativo", "Inativo", "bg-red-500"],
                ["emrevisão", "Em Revisão", "bg-blue-500"],
              ].map(([key, label, cor]) => (
                <button
                  key={key}
                  onClick={() => toggleFiltro(key as FiltroStatus)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                    filtroStatus === key
                      ? `${cor} text-white`
                      : "bg-white border-[#C7B394] text-[#4A3F35]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={handleNovo}
              className="flex items-center gap-2 bg-[#AF5D2A] hover:bg-[#8E481F] text-white px-5 py-2 rounded-lg"
            >
              Novo Vendedor <Plus size={20} />
            </button>
          </div>

          {/* LISTA */}
          <div className="bg-white border border-[#E0CAB3] rounded-lg shadow-sm">
            <div className="px-5 py-3 bg-[#F7E8DD] text-[#4A3F35] font-bold border-b">
              Lista de Vendedores
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#E8A6A6] text-[#4A3F35]">
                  <th className="px-6 py-3 font-semibold text-sm">Nome</th>
                  <th className="px-6 py-3 font-semibold text-sm">CPF</th>
                  <th className="px-6 py-3 font-semibold text-sm">Meta</th>
                  <th className="px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="px-6 py-3 font-semibold text-sm">Ações</th>
                </tr>
              </thead>

              <tbody className="bg-[#FDEEEE]">
                {vendedoresFiltrados.map((v) => (
                  <tr key={v.id} className="border-b border-[#EBC7C7]">
                    <td className="px-6 py-3">{v.nome}</td>
                    <td className="px-6 py-3">{v.cpf}</td>
                    <td className="px-6 py-3">{v.meta}</td>
                    <td className="px-6 py-3">
                      <span className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${getStatusColor(v.status)}`}></span>
                        {v.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(v)}
                        className="p-2 hover:bg-[#F2D4D4] rounded-md"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 hover:bg-[#F2D4D4] rounded-md text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-[#4A3F35]">
              {vendedorEditando ? "Editar Vendedor" : "Novo Vendedor"}
            </h2>

            {["nome", "cpf", "meta"].map((campo) => (
              <div key={campo} className="mb-3">
                <label className="block text-sm font-semibold mb-1 capitalize">{campo}</label>
                <input
                  type="text"
                  value={(formData as any)[campo]}
                  onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            ))}

            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full border px-3 py-2 rounded-md mb-5"
            >
              <option>Ativo</option>
              <option>Pendente</option>
              <option>Inativo</option>
              <option>Em Revisão</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setMostrarModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-[#AF5D2A] text-white py-2 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
