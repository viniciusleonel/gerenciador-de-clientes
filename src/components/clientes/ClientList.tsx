import React from 'react';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    coordenada_x: number;
    coordenada_y: number;
}

interface ClientListProps {
    clientes: Cliente[];
}

const ClientList: React.FC<ClientListProps> = ({ clientes }) => {
    return (
        <div>
            {clientes.map(cliente => (
                <div key={cliente.id}>
                    <p>
                        <span>Id:</span> {cliente.id}
                    </p>
                    <p>
                        <span>Nome:</span> {cliente.nome}
                    </p>
                    <p>
                        <span>Email:</span> {cliente.email}
                    </p>
                    <p>
                        <span>Telefone:</span> {cliente.telefone}
                    </p>
                    <p>
                        <span>Coordenada X:</span> {cliente.coordenada_x}
                    </p>
                    <p>
                        <span>Coordenada Y:</span> {cliente.coordenada_y}
                    </p>
                    <div>
                        <button>Atualizar</button>
                        <button>Excluir</button>
                    </div>
                </div>
            ))}
            <div>
                <button>Fechar</button>
            </div>
        </div>
    );
};

export default ClientList;
