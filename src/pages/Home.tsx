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
    const [idCliente, setIdCliente] = useState('');
    const [cliente, setCliente] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');


    const createCliente = async (clientes: any) => {
        try {
            await fetch('http://localhost:3001/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientes),
            });

            getClienteList();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    const getClienteList = async () => {
        try {
            const response = await fetch('http://localhost:3001/clientes');
            const data = await response.json();
            setClientes(data);
            setExibirLista(true);
            setExibirRota(false);
            setExibirFormulario(false);
            closeCliente()
            setErrorMessage('')
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    

    const showClienteRoute = async () => {
        try {
            const response = await fetch('http://localhost:3001/calcular-rota');
            const data = await response.json();
            const { rota, distancia } = data;
            setClientes(rota);
            setDistancia(distancia);
            setExibirRota(true);
            setExibirLista(false);
            setExibirFormulario(false);
            closeCliente()
            setErrorMessage('')
        } catch (error) {
            console.error('Erro ao buscar rota:', error);
        }
    };

    async function getCliente() {
        
        try {

            if (!idCliente) {
                throw new Error('Por favor, digite o ID do cliente');
            }

            const response = await fetch(`http://localhost:3001/clientes/${idCliente}`);
            if (!response.ok) {
                throw new Error('Cliente não encontrado!');
            }
            const data = await response.json();
            setCliente(data); 
            setErrorMessage('Cliente encontrado!');

        } catch (err: any) {
            setErrorMessage(` ${err.message}`);
        }
        
    }

    const deleteCliente = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/clientes/${id}`, {
                method: 'DELETE',
            });
            closeCliente()
            getClienteList();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

    const closeForm = () => {
        setExibirFormulario(false);
    }

    const closeClienteList = () => {
        setExibirLista(false);
    }

    const closeClientesRoute = () => {
        setExibirRota(false);
    }

    function showClienteForm () {
        setExibirFormulario(true);
        setExibirRota(false);
        setExibirLista(false);
        setCliente(false)
        closeCliente()
        setErrorMessage('')
    }

    function closeAll () {
        setExibirFormulario(false);
        setExibirRota(false);
        setExibirLista(false);
        closeCliente()
    }    
    
    const handleInputChange = (event: any) => {
        setIdCliente(event.target.value); 
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            getCliente();
            closeAll();
        }
    }; 

    function closeCliente () {
        setCliente(false)
    }

    return (
        <div className='flex flex-col h-screen bg-gray-300'>
            <div className=" flex items-center bg-custom-background justify-between">
                <DropdownButton
                    text="Menu"
                    options={[
                        { label: 'Cadastrar Cliente', onClick: showClienteForm },
                        { label: 'Listar Clientes', onClick: getClienteList },
                        { label: 'Calcular Rota', onClick: showClienteRoute },
                    ]}
                />
                <h1 className="text-3xl font-bold text-color-aqua p-6">Gerenciador de Clientes</h1>
                <SearchButton 
                    closeAll={closeAll} 
                    deleteCliente={deleteCliente}
                    handleKeyDown={handleKeyDown}
                    handleInputChange={handleInputChange}
                    cliente={cliente}
                />
            </div>
            {errorMessage && <h2 className='text-4xl font-medium flex justify-center mt-4'>{errorMessage}</h2>}
            {exibirLista && <ClientList clientes={clientes} closeClienteList={closeClienteList} deleteCliente={deleteCliente} />}
            {exibirRota && <ClientRoute clientes={clientes} closeClientesRoute={closeClientesRoute} distancia={distancia} />}
            {exibirFormulario && <ClientForm createCliente={createCliente} closeForm={closeForm} />}
        </div>
    );
}
