import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import DropdownButton from '../components/buttons/DropDownButton';
import ClientList from '../components/clientes/ClientList';
import ClientRoute from '../components/clientes/ClientRoute';
import ClientForm from '../components/clientes/ClientForm'; // Importe o componente ClientForm

export function Home() {
    const [clientes, setClientes] = useState([]);
    const [exibirLista, setExibirLista] = useState(false); // Estado para controlar a exibição da lista de clientes
    const [exibirRota, setExibirRota] = useState(false); // Estado para controlar a exibição da rota
    const [exibirFormulario, setExibirFormulario] = useState(false); // Estado para controlar a exibição do formulário de cadastro de cliente
    const [distancia, setDistancia] = useState(0); // Estado para armazenar a distância da rota

    const cadastrarCliente = async () => {
        try {
            await fetch('http://localhost:3001/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientes), // Corrigido para enviar a lista de clientes
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
            setExibirLista(true); // Define exibirLista como true ao clicar no botão "Listar Clientes"
            setExibirRota(false); // Garante que exibirRota seja false ao clicar no botão "Listar Clientes"
            setExibirFormulario(false); // Garante que exibirFormulario seja false ao clicar no botão "Listar Clientes"
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const exibirRotaFunc = async () => {
        try {
            const response = await fetch('http://localhost:3001/calcular-rota');
            const data = await response.json();
            const { rota, distancia } = data; // Extrair a distância da resposta da API
            setClientes(rota);
            setDistancia(distancia); // Definir a distância no estado
            setExibirRota(true); // Define exibirRota como true ao clicar no botão "Exibir Rota"
            setExibirLista(false); // Garante que exibirLista seja false ao clicar no botão "Exibir Rota"
            setExibirFormulario(false); // Garante que exibirFormulario seja false ao clicar no botão "Exibir Rota"
        } catch (error) {
            console.error('Erro ao buscar rota:', error);
        }
    };

    function exibirForm () {
        setExibirFormulario(true) 
        setExibirRota(false)
        setExibirLista(false);
    }

    return (
        <div>
            <div className="flex items-center bg-custom-background justify-between">
                <DropdownButton
                    text="Menu"
                    options={[
                        { label: 'Cadastrar Cliente', onClick: exibirForm }, // Corrigido para chamar a função exibirFormulario diretamente
                        { label: 'Listar Clientes', onClick: listarClientes },
                        { label: 'Exibir Rota', onClick: exibirRotaFunc },
                    ]}
                />
                <h1 className="text-3xl font-bold text-color-aqua p-6">Gerenciador de Clientes</h1>
                <Button text="Buscar" />
            </div>
            {exibirLista && <ClientList clientes={clientes} />} {/* Renderiza a lista de clientes se exibirLista for true */}
            {exibirRota && <ClientRoute clientes={clientes} distancia={distancia} />} {/* Renderiza a rota se exibirRota for true */}
            {exibirFormulario && <ClientForm cadastrarCliente={cadastrarCliente} />} {/* Renderiza o formulário de cadastro de cliente se exibirFormulario for true */}
        </div>
    );
}
