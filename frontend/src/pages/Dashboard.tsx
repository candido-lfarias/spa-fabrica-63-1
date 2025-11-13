import React, { useState, useEffect } from 'react';

// Tipos/Interfaces
interface StatCard {
  icon: string;
  number: number;
  label: string;
}

interface UpdateRow {
  date: string;
  action: string;
}

interface StockItem {
  name: string;
  quantity: string;
  status: 'critical' | 'warning' | 'ok';
}

interface MenuItem {
  icon: string;
  label: string;
  page: string;
}

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  // Atualizar horário
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);

    return () => clearInterval(interval);
  }, []);

  // Dados do Dashboard
  const stats: StatCard[] = [
    { icon: '📄', number: 12, label: 'Pedidos\nAtivos' },
    { icon: '⚙', number: 4, label: 'Produção\nem Andamento' },
    { icon: '📦', number: 57, label: 'Insumos\nem Estoque' },
    { icon: '✅', number: 9, label: 'Fornecedores\nAprovados' },
  ];

  const updates: UpdateRow[] = [
    { date: '12/04/2025', action: 'Novo pedido criado' },
    { date: '12/04/2025', action: 'Fornecedor aprovado' },
    { date: '12/04/2025', action: 'Insumos recebidos' },
    { date: '11/04/2025', action: 'Pedido concluído' },
    { date: '11/04/2025', action: 'Novo pedido criado' },
  ];

  const stockItems: StockItem[] = [
    { name: 'Farinha', quantity: '20 kg', status: 'critical' },
    { name: 'Leite', quantity: '15 L', status: 'critical' },
    { name: 'Polvilho', quantity: '13 kg', status: 'critical' },
  ];

  const menuItems: MenuItem[] = [
    { icon: '🏠', label: 'Dashboard', page: 'dashboard' },
    { icon: '📋', label: 'Pedidos', page: 'pedidos' },
    { icon: '👥', label: 'Clientes', page: 'clientes' },
    { icon: '⚙', label: 'Produção', page: 'producao' },
    { icon: '📦', label: 'Estoque', page: 'estoque' },
    { icon: '👤', label: 'Fornecedores', page: 'fornecedores' },
    { icon: '🛒', label: 'Compradores', page: 'compradores' },
    { icon: '⚙', label: 'Configurações', page: 'configuracoes' },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-400 text-brown-800';
      case 'ok':
        return 'bg-green-600 text-white';
      default:
        return 'bg-yellow-400 text-brown-800';
    }
  };

  return (
    <div className="min-h-screen bg-beige-100 font-mono">
      {/* Header */}
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
          <div className="text-brown-800 flex items-center gap-2 font-semibold">
            🕐 {currentTime}
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <aside className="w-60 bg-beige-100 py-5 border-r-2 border-brown-800">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <div
                key={item.page}
                className={`px-6 py-4 cursor-pointer flex items-center gap-3 text-base transition-all duration-300 border-l-4 ${
                  activeMenu === item.page
                    ? 'bg-brown-800 text-beige-100 border-brown-600'
                    : 'text-brown-800 border-transparent hover:bg-beige-200 hover:border-brown-600'
                }`}
                onClick={() => setActiveMenu(item.page)}
              >
                <span className="text-xl min-w-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-brown-800 text-3xl font-bold mb-8">
            Painel de Controle - Marquespão
          </h1>

          {/* Stats Grid */}
          <section className="grid grid-cols-4 gap-5 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-brown-800 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-5xl font-bold text-brown-800 mb-1">
                  {stat.number}
                </div>
                <div className="text-brown-800 text-sm whitespace-pre-line">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-5">
            {/* Últimas Atualizações */}
            <section className="col-span-2 bg-white border-2 border-brown-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-brown-800 text-2xl font-bold mb-5 border-b-2 border-beige-200 pb-3">
                Últimas Atualizações
              </h2>
              <div>
                <div className="grid grid-cols-[1fr_2fr] py-3 border-b-2 border-brown-800 text-brown-800 font-bold">
                  <div>Data</div>
                  <div>Ação Realizada</div>
                </div>
                {updates.map((update, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_2fr] py-4 border-b border-tan-300 transition-colors duration-200 hover:bg-beige-50 last:border-b-0"
                  >
                    <div className="text-brown-800 font-semibold">
                      {update.date}
                    </div>
                    <div className="text-gray-700">{update.action}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Estoque Crítico */}
            <section className="bg-white border-2 border-brown-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-brown-800 text-2xl font-bold mb-5 border-b-2 border-beige-200 pb-3">
                Estoque Crítico
              </h2>
              <div>
                <div className="grid grid-cols-[1.5fr_1fr_1fr] py-3 border-b-2 border-brown-800 text-brown-800 font-bold">
                  <div>Insumo</div>
                  <div>Quantidade</div>
                  <div>Status</div>
                </div>
                {stockItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1fr_1fr] py-4 items-center border-b border-tan-300 transition-colors duration-200 hover:bg-beige-50 last:border-b-0"
                  >
                    <div className="text-brown-800">{item.name}</div>
                    <div className="text-brown-800">{item.quantity}</div>
                    <div>
                      <span
                        className={`${getStatusColor(
                          item.status
                        )} px-3 py-1 rounded text-xs font-bold uppercase inline-block`}
                      >
                        Crítico
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;