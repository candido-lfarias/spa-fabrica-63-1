import React, { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "João Pereira", email: "joao@gmail.com" },
    { id: 2, name: "Maria Silva", email: "maria@gmail.com" }
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleSave() {
    if (!name.trim() || !email.trim()) return;

    if (editingId) {
      // editar cliente
      setCustomers(prev =>
        prev.map(c =>
          c.id === editingId ? { ...c, name, email } : c
        )
      );
      setEditingId(null);
    } else {
      // adicionar novo
      setCustomers(prev => [
        ...prev,
        { id: Date.now(), name, email }
      ]);
    }

    setName("");
    setEmail("");
  }

  function handleEdit(id: number) {
    const c = customers.find(x => x.id === id);
    if (!c) return;

    setName(c.name);
    setEmail(c.email);
    setEditingId(id);
  }

  function handleDelete(id: number) {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="min-h-screen w-full p-6" style={{ backgroundColor: "#e8d1b3" }}>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-4">Clientes</h1>

        {/* Form */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            className="border p-2 rounded"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: "#894224" }}
          >
            {editingId ? "Salvar Edição" : "Adicionar Cliente"}
          </button>
        </div>

        {/* Tabela */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Nome</th>
              <th className="border p-2 text-left">E-mail</th>
              <th className="border p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2 text-center">
                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() => handleEdit(c.id)}
                      className="px-3 py-1 rounded text-white"
                      style={{ backgroundColor: "#894224" }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Excluir
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
