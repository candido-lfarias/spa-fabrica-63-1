import React, { useState } from "react";
import marca from "../assets/marquespao.png";

type Status = "Ativo" | "Pendente" | "Inativo";

type Buyer = {
  id: number;
  name: string;
  cpf: string;
  limit: number;
  used: number;
  status: Status;
};

export default function Purchases(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState<Status | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Tabela vazia agora
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  // Campos do modal
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState<Status>("Ativo");

  const [editingId, setEditingId] = useState<number | null>(null);

  const statusColors: Record<Status, string> = {
    Ativo: "text-green-600",
    Pendente: "text-yellow-600",
    Inativo: "text-red-600",
  };

  function resetFields() {
    setName("");
    setCpf("");
    setLimit("");
    setStatus("Ativo");
  }

  function saveBuyer() {
    if (!name.trim() || !cpf.trim() || !limit.trim()) return;

    if (editingId) {
      // Editar
      setBuyers(prev =>
        prev.map(b =>
          b.id === editingId
            ? { ...b, name, cpf, limit: Number(limit), status }
            : b
        )
      );
      setEditingId(null);
    } else {
      // Criar novo
      setBuyers(prev => [
        ...prev,
        {
          id: Date.now(),
          name,
          cpf,
          limit: Number(limit),
          used: 0,
          status,
        },
      ]);
    }

    resetFields();
    setShowModal(false);
  }

  function handleEdit(id: number) {
    const b = buyers.find(x => x.id === id);
    if (!b) return;

    setName(b.name);
    setCpf(b.cpf);
    setLimit(String(b.limit));
    setStatus(b.status);
    setEditingId(id);
    setShowModal(true);
  }

  function handleDelete(id: number) {
    setBuyers(prev => prev.filter(b => b.id !== id));
  }

  return (
    <div className="p-6 w-full min-h-screen" style={{ backgroundColor: "#FCF1DD" }}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center w-full mb-4">
        
        {/* LOGO */}
        <div className="w-[180px] h-[50px] rounded-lg flex items-center justify-center">
          <img
            src={marca}
            className="h-full object-contain"
            alt="Marca"
          />
        </div>

        {/* BOTÕES */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetFields();
              setEditingId(null);
              setShowModal(true);
            }}
            className="text-white px-4 py-2 rounded-lg shadow"
            style={{ backgroundColor: "#894224" }}
          >
            Novo Cliente
          </button>

          <button className="px-4 py-2 border rounded-lg shadow bg-white">
            Visão Geral
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className="shadow rounded-lg p-4" style={{ backgroundColor: "#FCF1DD" }}>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th>Cliente</th>
              <th>CNPJ/CPF</th>
              <th>Limite</th>
              <th>Utilizado</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {buyers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhum cliente cadastrado
                </td>
              </tr>
            ) : (
              buyers.map((b, index) => (
                <tr key={b.id} className="border-b h-14">
                  <td>{b.name}</td>
                  <td>{b.cpf}</td>
                  <td>R$ {b.limit}</td>
                  <td>R$ {b.used}</td>

                  <td>
                    <span
                      className={`cursor-pointer font-semibold ${statusColors[b.status]}`}
                      onClick={() => setShowStatusPopup(b.status)}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === index.toString()
                            ? null
                            : index.toString()
                        )
                      }
                      className="px-2 py-1 border rounded"
                    >
                      ⋮
                    </button>

                    {openDropdown === index.toString() && (
                      <div className="absolute right-0 bg-white border shadow rounded p-2 text-sm mt-1 z-10 w-28">
                        <p
                          className="cursor-pointer hover:bg-gray-100 p-1"
                          onClick={() => handleEdit(b.id)}
                        >
                          Editar
                        </p>
                        <p
                          className="cursor-pointer hover:bg-gray-100 p-1"
                          onClick={() => handleDelete(b.id)}
                        >
                          Excluir
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP STATUS */}
      {showStatusPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white w-[350px] rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">{showStatusPopup}</h2>
            <p className="text-gray-600 mb-4">
              Lista completa de clientes com status: {showStatusPopup}
            </p>
            <button
              onClick={() => setShowStatusPopup(null)}
              className="bg-[#894224] text-white px-4 py-2 rounded w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* POPUP NOVO CLIENTE */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white w-[450px] rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar Cliente" : "Novo Cliente"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                className="border p-2 rounded"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="CNPJ/CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Limite"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />

              <select
                className="border p-2 rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                <option value="Ativo">Ativo</option>
                <option value="Pendente">Pendente</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded border"
                onClick={() => {
                  resetFields();
                  setShowModal(false);
                }}
              >
                Cancelar
              </button>
              <button
                onClick={saveBuyer}
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "#894224" }}
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
