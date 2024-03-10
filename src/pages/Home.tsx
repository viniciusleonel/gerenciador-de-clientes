import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import DropdownButton from '../components/buttons/DropDownButton';
import ClientList from '../components/clientes/ClientList'; // Importe o componente ClientList
import { log } from 'console';

export function Home() {
    const [clientes, setClientes] = useState([]);

    const listarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3001/clientes');
            const data = await response.json();
            console.log("clicasteme")
            setClientes(data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const handleOption1Click = () => {
        console.log('Opção 1 clicada');
    };

    const handleOption2Click = () => {
        console.log('Opção 2 clicada');
    };

    const handleOption3Click = () => {
        console.log('Opção 3 clicada');
    };

    return (
        <div>
            <div className="flex items-center bg-custom-background justify-between">
                <DropdownButton
                    text="Menu"
                    options={[
                        { label: 'Listar Clientes', onClick: listarClientes },
                        { label: 'Opção 2', onClick: handleOption2Click },
                        { label: 'Opção 3', onClick: handleOption3Click },
                    ]}
                />
                <h1 className="text-3xl font-bold text-color-aqua p-6">Gerenciador de Clientes</h1>
                <Button text="Buscar" />
            </div>
            {/* Renderize o componente ClientList se a lista de clientes não estiver vazia */}
            {clientes.length > 0 && <ClientList clientes={clientes} />}
        </div>
    );
}
