import React from 'react';
import Button from '../buttons/Button'
import { FiTrash} from 'react-icons/fi'
import { TfiPencil } from "react-icons/tfi"

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
    excluirCliente: (id: number) => void
}

const ClientList: React.FC<ClientListProps> = ({ clientes, fecharLista, listarClientes, excluirCliente }) => {

    return (
        <div className='w-full flex justify-center px-4 bg-gray-300'>
            <main className='my-10 w-full md:max-w-2xl'>
                <section className="flex flex-col gap-4 ">
                    {clientes.map(cliente => (
                        <article 
                            className="w-full flex bg-white rounded p-2 relative hover:scale-105 duration-300"
                            key={cliente.id}
                        >

                            <div className='w-1/2'>
                                <p className=''>
                                    <span className='font-bold'>Id:</span> {cliente.id}
                                </p>
                                <p>
                                    <span className='font-bold'>Nome:</span> {cliente.nome}
                                </p>
                                <p>
                                    <span className='font-bold'>Email:</span> {cliente.email}
                                </p>
                            </div>

                            <div>
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

                            <button className='bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-8 -top-3'>
                                <TfiPencil size={18} color='#fff' />
                            </button>
                            <button 
                                className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-3 hover:scale-110 duration-300'
                                onClick={() => excluirCliente(cliente.id)}  
                            >   <FiTrash size={18} color='#fff' />
                            </button>
                        </article>
                    ))}
                    <div className=' flex justify-center'>
                        <Button
                            text='Fechar'
                            onClick={fecharLista}
                        ></Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ClientList;
