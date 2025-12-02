import React, { useState } from "react";

type SupplierStatus = "Ativo" | "Pendente" | "Inativo";

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  prazo: string;
  limite: string;
  status: SupplierStatus;
}

const Suppliers: React.FC = () => {
  // lista inicial vazia (os fornecedores serão adicionados pelo modal)
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // estado do formulário do modal
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    type: "",
    prazo: "",
    limite: "",
    status: "Ativo" as SupplierStatus,
  });

  // atualizar campo do form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // salvar fornecedor (simples, front-end only)
  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Informe o nome da empresa.");
      return;
    }

    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: form.name.trim(),
      cnpj: form.cnpj.trim() || "-",
      type: form.type.trim() || "-",
      prazo: form.prazo.trim() || "-",
      limite: form.limite.trim() || "-",
      status: form.status,
    };

    setSuppliers((prev) => [newSupplier, ...prev]);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // limpar form
    setForm({
      name: "",
      cnpj: "",
      type: "",
      prazo: "",
      limite: "",
      status: "Ativo",
    });
  };

  const getStatusColor = (status: SupplierStatus) => {
    switch (status) {
      case "Ativo":
        return "text-green-600";
      case "Pendente":
        return "text-yellow-500";
      case "Inativo":
        return "text-red-600";
      default:
        return "";
    }
  };

  // sidebar items (somente visual aqui)
  const menuItems = [
    "Dashboard",
    "Pedidos",
    "Clientes",
    "Produção",
    "Estoque",
    "Fornecedores",
    "Compradores",
    "Configurações",
  ];

  return (
    <div className="min-h-screen bg-beige-100 font-mono flex flex-col">
      {/* Header (igual ao estilo do projeto) */}
      <header className="bg-beige-100 px-8 py-4 flex justify-between items-center border-b-2 border-brown-800 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="text-3xl font-bold text-brown-600 italic tracking-wide">
            MARQ<span className="text-black">UESPÃO</span>III
          </div>
          <div className="text-brown-800 text-lg font-semibold">
            Sistema de Gerenciamento
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="text-green-700 flex items-center gap-2 font-semibold">
            <span className="bg-green-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            Sistema Online
          </div>
          <div className="text-brown-800 font-semibold">🕐 14:32</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR: marcadores vermelhos + indicador vertical preto no item ativo */}
        <aside className="w-60 bg-beige-100 py-5 border-r-2 border-brown-800">
          <nav className="flex flex-col">
            {menuItems.map((item) => {
              const isActive = item === "Fornecedores";
              return (
                <div key={item} className="relative">
                  {/* indicador vertical preto */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black rounded-r"></div>
                  )}

                  <div
                    className={`px-6 py-4 cursor-pointer flex items-center gap-3 text-base transition-all duration-300 ${
                      isActive
                        ? "bg-transparent text-brown-800 ml-2"
                        : "text-brown-800 ml-2 hover:bg-beige-200"
                    }`}
                  >
                    {/* marcador vermelho */}
                    <span className="text-red-500 text-lg">📌</span>
                    <span>{item}</span>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl text-brown-800 font-bold">
                Lista de Fornecedores
              </h1>
              <p className="text-sm text-gray-600">Status de Qualificação:</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                  Aprovado
                </span>
                <span className="bg-red-400 text-white px-3 py-1 rounded-lg text-sm">
                  Suspenso
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brown-800 text-beige-100 px-5 py-3 rounded-lg font-bold shadow hover:bg-brown-700 transition"
            >
              + Novo Fornecedor
            </button>
          </div>

          {/* TABELA */}
          <section className="bg-white border-2 border-brown-800 rounded-xl p-6">
            <div className="grid grid-cols-6 py-3 border-b-2 border-brown-800 font-bold text-brown-800">
              <div>Nome da Empresa</div>
              <div>CNPJ</div>
              <div>Tipo de Insumo</div>
              <div>Prazo</div>
              <div>Limite de Crédito</div>
              <div>Status</div>
            </div>

            {suppliers.length === 0 ? (
              <div className="py-12 text-center text-gray-600">
                Nenhum fornecedor cadastrado. Clique em <strong>+ Novo Fornecedor</strong> para adicionar.
              </div>
            ) : (
              suppliers.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-6 py-4 items-center border-b border-tan-300 hover:bg-beige-50 transition"
                >
                  <div className="text-brown-800">{s.name}</div>
                  <div className="text-gray-700">{s.cnpj}</div>
                  <div className="text-brown-800">{s.type}</div>
                  <div className="text-brown-800">{s.prazo}</div>
                  <div className="text-brown-800">{s.limite}</div>
                  <div className={`font-bold ${getStatusColor(s.status)}`}>{s.status}</div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={closeModal}
          />

          {/* modal content */}
          <div className="relative bg-white rounded-xl p-7 w-[760px] shadow-xl border-2 border-brown-800 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-brown-800">Novo Fornecedor</h2>
                <p className="text-gray-600 mt-1">Preencha os detalhes para adicionar um novo fornecedor.</p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 ml-4 text-xl"
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>

            {/* form */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <input
                name="cnpj"
                value={form.cnpj}
                onChange={handleChange}
                placeholder="CNPJ"
                className="border p-3 rounded"
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome da Empresa"
                className="border p-3 rounded"
              />
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Contatos / Tipo de Insumo"
                className="border p-3 rounded"
              />
              <input
                name="prazo"
                value={form.prazo}
                onChange={handleChange}
                placeholder="Condições de Pagamento / Prazo"
                className="border p-3 rounded"
              />
              <input
                name="limite"
                value={form.limite}
                onChange={handleChange}
                placeholder="Limite de Crédito"
                className="border p-3 rounded"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-3 rounded"
              >
                <option value="Ativo">Ativo</option>
                <option value="Pendente">Pendente</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            {/* botões */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-5 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-brown-800 text-white font-bold rounded hover:bg-brown-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
