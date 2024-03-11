import React from 'react';
import Button from '../buttons/Button'

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    coordenada_x: number;
    coordenada_y: number;
}

interface ClientListProps {
    clientes: Cliente[]
    fecharLista: () => void
    listarClientes: () => void
}

const ClientList: React.FC<ClientListProps> = ({ clientes, fecharLista, listarClientes }) => {

    const excluirCliente = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/clientes/${id}`, {
                method: 'DELETE',
            });
            listarClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    return (
        <div className='flex-col'>
            {clientes.map(cliente => (
                <div key={cliente.id} className='flex-col border-b border-black p-5'>
                    <div className='flex gap-5 pb-5 text-lg'>

                    <p className=''>
                        <span className='font-bold'>Id:</span> {cliente.id}
                    </p>
                    <p>
                        <span className='font-bold'>Nome:</span> {cliente.nome}
                    </p>
                    <p>
                        <span className='font-bold'>Email:</span> {cliente.email}
                    </p>
                    <p>
                        <span className='font-bold'>Telefone:</span> {cliente.telefone}
                    </p>
                    <p>
                        <span className='font-bold'>Coordenada X:</span> {cliente.coordenada_x}
                    </p>
                    <p>
                        <span className='font-bold'>Coordenada Y:</span> {cliente.coordenada_y}
                    </p>
                    </div>
                    <div className='flex justify-start'>
                        <Button
                            text='Atualizar'></Button>
                        <Button
                            text='Excluir'
                            onClick={() => excluirCliente(cliente.id)}></Button>
                    </div>
                </div>
                
            ))}
            <div className=' flex justify-center my-5'>
                <Button
                    text='Fechar'
                    onClick={fecharLista}
                ></Button>
            </div>
        </div>
    );
};

export default ClientList;
