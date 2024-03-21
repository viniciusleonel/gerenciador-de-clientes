import React, { useState } from 'react';
import DropdownButton from '../components/buttons/DropDownButton';
import ClientList from '../components/clientes/ClientList';
import ClientRoute from '../components/clientes/ClientRoute';
import ClientForm from '../components/clientes/ClientForm';
import SearchButton from '../components/buttons/SearchButton';

export function Home() {
    const [clientes, setClientes] = useState([]);
    const [exibirLista, setExibirLista] = useState(false);
    const [exibirRota, setExibirRota] = useState(false);
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [distancia, setDistancia] = useState(0);

    const cadastrarCliente = async (clientes: any) => {
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
            fecharCliente()
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
            fecharCliente()
        } catch (error) {
            console.error('Erro ao buscar rota:', error);
        }
    };

    const excluirCliente = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/clientes/${id}`, {
                method: 'DELETE',
            });
            fecharCliente()
            listarClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
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
        setCliente(false)
        fecharCliente()
    }

    function fecharTudo () {
        setExibirFormulario(false);
        setExibirRota(false);
        setExibirLista(false);
        fecharCliente()
    }    

    const [idCliente, setIdCliente] = useState('');
    const [cliente, setCliente] = useState<any>(null);
    const [error, setError] = useState('');

    const handleInputChange = (event: any) => {
        setIdCliente(event.target.value); // Captura o valor do ID inserido no input
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            buscarCliente();
            fecharTudo();
        }
    }; 

    function fecharCliente () {
        setCliente(false)
    }

    async function buscarCliente() {
        
        try {

            if (!idCliente) {
                throw new Error('Por favor, digite o ID do cliente');
            }

            const response = await fetch(`http://localhost:3001/clientes/${idCliente}`);
            if (!response.ok) {
                throw new Error('Cliente não encontrado');
            }
            const data = await response.json();
            setCliente(data); // Atualiza o estado com os dados do cliente encontrado
            setError('');

        } catch (err){
            throw new Error(`testando ${err}`);
        }
        
    }

    return (
        <div className='flex flex-col h-screen bg-gray-300'>
            <div className=" flex items-center bg-custom-background justify-between">
                <DropdownButton
                    text="Menu"
                    options={[
                        { label: 'Cadastrar Cliente', onClick: exibirForm },
                        { label: 'Listar Clientes', onClick: listarClientes },
                        { label: 'Calcular Rota', onClick: exibirRotaFunc },
                    ]}
                />
                <h1 className="text-3xl font-bold text-color-aqua p-6">Gerenciador de Clientes</h1>
                <SearchButton 
                    fecharTudo={fecharTudo} 
                    excluirCliente={excluirCliente}
                    handleKeyDown={handleKeyDown}
                    handleInputChange={handleInputChange}
                    cliente={cliente}
                />
            </div>
            {exibirLista && <ClientList clientes={clientes} fecharLista={fecharLista} listarClientes={listarClientes} excluirCliente={excluirCliente} />}
            {exibirRota && <ClientRoute clientes={clientes} fecharRota={fecharRota} distancia={distancia} />}
            {exibirFormulario && <ClientForm cadastrarCliente={cadastrarCliente} fecharFormulario={fecharFormulario} />}
        </div>
    );
}
