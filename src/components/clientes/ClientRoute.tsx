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

interface ClientRouteProps {
    clientes: Cliente[];
    distancia: number;
    fecharRota: () => void
}

const ClientRoute: React.FC<ClientRouteProps> = ({ clientes, distancia, fecharRota }) => {
    return (
        <div className='w-full flex justify-center px-4 bg-gray-300'>
            <main className='mt-4 w-full md:max-w-2xl'>
                <div className='pb-4'>
                    <h2 className="text-3xl font-semibold">Rota Calculada</h2>
                    <p className="text-2xl font-semibold">Distância: {distancia.toFixed(2)}</p>
                </div>
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
                        </article>
                    ))}
                    <div className=' flex justify-center'>
                        <Button
                            text='Fechar'
                            onClick={fecharRota}
                        ></Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ClientRoute;
