import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface Comprador {
    nome: string;
    email: string;
    limiteAlcado: string;
    usado: string;
    status: 'Ativo' | 'Pendente' | 'Inativo';
}

const Buyers = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Ativos');

    const [compradores, setCompradores] = useState<Comprador[]>([
        { nome: 'Jefe Doe', email: 'johndoe@email.com', limiteAlcado: 'R$10.000,00', usado: '60% usado', status: 'Ativo' },
        { nome: 'Wellington', email: 'wellington@email.com', limiteAlcado: 'R$20.000,00', usado: '30% usado', status: 'Pendente' },
        { nome: 'Joao', email: 'joao123@email.com', limiteAlcado: 'R$30.000,00', usado: '70% usado', status: 'Pendente' },
        { nome: 'Matheus', email: 'matheus@email.com', limiteAlcado: 'R$12.000,00', usado: '80% usado', status: 'Ativo' },
        { nome: 'Lucas', email: 'oliveira@email.com', limiteAlcado: 'R$00.000,00', usado: '80% usado', status: 'Pendente' },
        { nome: 'Pedro Jacinto', email: 'Jacintopedr@hotmail.com', limiteAlcado: 'R$40.000,00', usado: '100% usado', status: 'Inativo' },
        { nome: 'Emanuel', email: 'emanuel@email.com', limiteAlcado: 'R$00.000,00', usado: '100% usado', status: 'Inativo' }
    ]); 

    // Formulário de novo comprador
    const [novoComprador, setNovoComprador] = useState({
        nome: '',
        email: '',
        limiteAlcado: '',
        usado: '0% usado',
        status: 'Ativo' as 'Ativo' | 'Pendente' | 'Inativo'
    });

    const getStatusColor = (status: 'Ativo' | 'Pendente' | 'Inativo'): string => {
        switch (status) {
            case 'Ativo': return '#22C55E';
            case 'Pendente': return '#FCD34D';
            case 'Inativo': return '#EF4444';
            default: return '#6B7280';
        }
    };

    // Filtrar pedidos baseado no filtro selecionado
    const pedidosFiltrados = compradores.filter(comprador => {
        if (selectedFilter === 'Ativos') return comprador.status === 'Ativo';
        if (selectedFilter === 'Pendentes') return comprador.status === 'Pendente';
        if (selectedFilter === 'Inativos') return comprador.status === 'Inativo';
        return true;
    });

    // Adicionar novo comprador
    const handleAdicionarComprador = () => {
        if (novoComprador.nome && novoComprador.email && novoComprador.limiteAlcado) {
            setCompradores([...compradores, novoComprador]);
            setNovoComprador({
                nome: '',
                email: '',
                limiteAlcado: '',
                usado: '0% usado',
                status: 'Ativo'
            });
            setIsModalOpen(false);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios!');
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FCF1DD' }}>
            <div className="flex justify-end gap-4 px-8 pt-8">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#894224' }}
                >
                    Pedidos de Compra
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 border-2 flex items-center gap-2"
                    style={{ backgroundColor: '#FCF1DD', color: '#894224', borderColor: '#894224' }}
                >
                    <Plus size={20} />
                    Novo Comprador
                </button>
            </div>

            {/* Main Content */}
            <main className="px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ border: '2px solid #894224' }}>
                    <table className="w-full">
                        <thead style={{ backgroundColor: '#894224' }}>
                            <tr>
                                <th className="px-6 py-4 text-left text-white font-semibold">Nome</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Limite Alçado</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compradores.map((comprador, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-opacity-50"
                                    style={{
                                        backgroundColor: index % 2 === 0 ? '#FCF1DD' : '#FEFAF1',
                                        borderColor: '#894224'
                                    }}
                                >
                                    <td className="px-6 py-4" style={{ color: '#894224' }}>{comprador.nome}</td>
                                    <td className="px-6 py-4" style={{ color: '#894224' }}>{comprador.email}</td>
                                    <td className="px-6 py-4">
                                        <div style={{ color: '#894224' }}>{comprador.limiteAlcado}</div>
                                        <div className="text-sm" style={{ color: '#894224', opacity: 0.7 }}>{comprador.usado}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
                                            style={{
                                                backgroundColor: getStatusColor(comprador.status),
                                                color: 'white'
                                            }}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                            {comprador.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="px-4 py-2 rounded text-sm font-semibold transition-all hover:opacity-80"
                                            style={{
                                                backgroundColor: comprador.status === 'Inativo' ? '#894224' : '#FCF1DD',
                                                color: comprador.status === 'Inativo' ? 'white' : '#894224',
                                                border: '2px solid #894224'
                                            }}
                                        >
                                            {comprador.status === 'Inativo' ? '1 ano atrás' : 'Hoje'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Sidebar Menu - Pedidos de Compra */}
            {isDropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-transparent z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div
                        className="fixed top-0 right-0 h-full w-96 shadow-2xl z-50 overflow-y-auto"
                        style={{ backgroundColor: '#FCF1DD' }}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: '#894224' }}>Pedidos de Compra</h2>
                                <button onClick={() => setIsDropdownOpen(false)}>
                                    <X size={24} style={{ color: '#894224' }} />
                                </button>
                            </div>

                            <div className="space-y-3 mb-6">
                                {['Ativos', 'Pendentes', 'Inativos'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedFilter(filter)}
                                        className="w-full px-4 py-3 rounded-lg font-semibold text-left transition-all"
                                        style={{
                                            backgroundColor: selectedFilter === filter ? '#894224' : 'white',
                                            color: selectedFilter === filter ? 'white' : '#894224',
                                            border: '2px solid #894224'
                                        }}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {pedidosFiltrados.length === 0 ? (
                                    <div className="text-center py-8" style={{ color: '#894224' }}>
                                        <p className="font-semibold">Nenhum pedido encontrado</p>
                                        <p className="text-sm opacity-70">Não há pedidos com status "{selectedFilter}"</p>
                                    </div>
                                ) : (
                                    pedidosFiltrados.map((pedido, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow"
                                            style={{ border: '1px solid #894224' }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold" style={{ color: '#894224' }}>{pedido.nome}</h3>
                                                    <p className="text-sm" style={{ color: '#894224', opacity: 0.7 }}>{pedido.email}</p>
                                                </div>
                                                <span
                                                    className="px-2 py-1 rounded-full text-xs font-semibold"
                                                    style={{
                                                        backgroundColor: getStatusColor(pedido.status),
                                                        color: 'white'
                                                    }}
                                                >
                                                    {pedido.status}
                                                </span>
                                            </div>
                                            <div className="text-sm" style={{ color: '#894224' }}>
                                                <p className="font-semibold">{pedido.limiteAlcado}</p>
                                                <p style={{ opacity: 0.7 }}>{pedido.usado}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal - Novo Comprador */}
            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-transparent z-40 flex items-center justify-center"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 relative z-50"
                            style={{ border: '3px solid #894224' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: '#894224' }}>Novo Comprador</h2>
                                <button onClick={() => setIsModalOpen(false)}>
                                    <X size={24} style={{ color: '#894224' }} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-semibold" style={{ color: '#894224' }}>Nome *</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu nome"
                                        value={novoComprador.nome}
                                        onChange={(e) => setNovoComprador({ ...novoComprador, nome: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: '#894224',
                                            backgroundColor: '#FCF1DD'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-semibold" style={{ color: '#894224' }}>Email *</label>
                                    <input
                                        type="email"
                                        placeholder="Digite o email do comprador"
                                        value={novoComprador.email}
                                        onChange={(e) => setNovoComprador({ ...novoComprador, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: '#894224',
                                            backgroundColor: '#FCF1DD'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-semibold" style={{ color: '#894224' }}>Limite Alçado *</label>
                                    <input
                                        type="text"
                                        placeholder="R$0,00"
                                        value={novoComprador.limiteAlcado}
                                        onChange={(e) => setNovoComprador({ ...novoComprador, limiteAlcado: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: '#894224',
                                            backgroundColor: '#FCF1DD'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-semibold" style={{ color: '#894224' }}>Status</label>
                                    <select
                                        value={novoComprador.status}
                                        onChange={(e) => setNovoComprador({ ...novoComprador, status: e.target.value as 'Ativo' | 'Pendente' | 'Inativo' })}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: '#894224',
                                            backgroundColor: '#FCF1DD',
                                            color: '#894224'
                                        }}
                                    >
                                        <option value="Ativo">Ativo</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Inativo">Inativo</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAdicionarComprador}
                                    className="w-full py-3 rounded-lg font-bold text-white text-lg transition-all hover:opacity-90 mt-6"
                                    style={{ backgroundColor: '#894224' }}
                                >
                                    Concluído
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Buyers;