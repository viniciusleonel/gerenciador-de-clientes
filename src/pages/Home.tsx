import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import DropdownButton from '../components/buttons/DropDownButton';
import ClientList from '../components/clientes/ClientList';
import ClientRoute from '../components/clientes/ClientRoute';
import ClientForm from '../components/clientes/ClientForm';

export function Home() {
    const [clientes, setClientes] = useState([]);
    const [exibirLista, setExibirLista] = useState(false);
    const [exibirRota, setExibirRota] = useState(false);
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [distancia, setDistancia] = useState(0);

    const cadastrarCliente = async () => {
        try {
            await fetch('http://localhost:3001/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientes),
            });

            listarClientes();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    const listarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3001/clientes');
            const data = await response.json();
            setClientes(data);
            setExibirLista(true);
            setExibirRota(false);
            setExibirFormulario(false);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const exibirRotaFunc = async () => {
        try {
            const response = await fetch('http://localhost:3001/calcular-rota');
            const data = await response.json();
            const { rota, distancia } = data;
            setClientes(rota);
            setDistancia(distancia);
            setExibirRota(true);
            setExibirLista(false);
            setExibirFormulario(false);
        } catch (error) {
            console.error('Erro ao buscar rota:', error);
        }
    };

    const fecharFormulario = () => {
        setExibirFormulario(false);
    }

    const fecharLista = () => {
        setExibirLista(false);
    }

    const fecharRota = () => {
        setExibirRota(false);
    }

    function exibirForm () {
        setExibirFormulario(true);
        setExibirRota(false);
        setExibirLista(false);
    }

    return (
        <div>
            <div className="flex items-center bg-custom-background justify-between">
                <DropdownButton
                    text="Menu"
                    options={[
                        { label: 'Cadastrar Cliente', onClick: exibirForm },
                        { label: 'Listar Clientes', onClick: listarClientes },
                        { label: 'Calcular Rota', onClick: exibirRotaFunc },
                    ]}
                />
                <h1 className="text-3xl font-bold text-color-aqua p-6">Gerenciador de Clientes</h1>
                <Button text="Buscar" />
            </div>
            {exibirLista && <ClientList clientes={clientes} fecharLista={fecharLista} />}
            {exibirRota && <ClientRoute clientes={clientes} fecharRota={fecharRota} distancia={distancia} />}
            {exibirFormulario && <ClientForm cadastrarCliente={cadastrarCliente} fecharFormulario={fecharFormulario} />}
        </div>
    );
}
