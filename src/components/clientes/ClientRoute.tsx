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
}

const ClientRoute: React.FC<ClientRouteProps> = ({ clientes, distancia }) => {
    return (
        <div className='flex-col'>
            <div className="flex-row border-b border-black p-5 text-lg text-center">
                <h2 className="font-bold">Rota Calculada</h2>
                <p className="font-bold">Distância: {distancia.toFixed(2)}</p>
            </div>
            {clientes.map(cliente => (
                <div key={cliente.id} className='flex-col border-b border-black p-5'>
                    <div className='flex gap-5 pb-5 text-lg'>
                        <p>
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
                </div>
            ))}
            <div className='flex justify-center my-5'>
                <Button text='Fechar' />
            </div>
        </div>
    );
};

export default ClientRoute;
