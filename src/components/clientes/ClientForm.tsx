import React, { useState } from 'react';
import Button from '../buttons/Button';

interface Cliente {
    nome: string;
    email: string;
    telefone: string;
    coordenada_x: string;
    coordenada_y: string;
}

interface ClienteFormProps {
    cadastrarCliente: (cliente: Cliente) => Promise<void>;
    clienteAtual?: Cliente;
    fecharFormulario: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cadastrarCliente, clienteAtual, fecharFormulario }) => {
    const [nome, setNome] = useState(clienteAtual ? clienteAtual.nome : '');
    const [email, setEmail] = useState(clienteAtual ? clienteAtual.email : '');
    const [telefone, setTelefone] = useState(clienteAtual ? clienteAtual.telefone : '');
    const [coordenada_x, setCoordenada_x] = useState(clienteAtual ? clienteAtual.coordenada_x : '');
    const [coordenada_y, setCoordenada_y] = useState(clienteAtual ? clienteAtual.coordenada_y : '');
    const [active, setActive] = useState(!!clienteAtual);

    const handleDisplayForm = () => {
        setActive(!active);
    };

    const cadastrar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoCliente: Cliente = {
            nome: nome,
            email: email,
            telefone: telefone,
            coordenada_x: coordenada_x,
            coordenada_y: coordenada_y,
        };

        try {
            await cadastrarCliente(novoCliente);

            setNome('');
            setEmail('');
            setTelefone('');
            setCoordenada_x('');
            setCoordenada_y('');
        } catch (error) {
            console.error('Erro ao cadastrar/atualizar cliente:', error);
        }

        handleDisplayForm();
    };

    const cancelarSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        handleDisplayForm();
    };

    return (
        <form onSubmit={cadastrar} className='flex flex-col m-3 p-3 w-[30rem]'>
            <h2 className='font-bold text-3xl pb-5 ms-6 text-start'>Cadastrar Cliente</h2>
            <div className='flex flex-col ms-6'>
                <label className='font-bold text-lg' htmlFor="nome">Nome:</label>
                <input className='pt-1 pb-1 mb-4 w-[20.7rem] border border-black rounded-lg' id="nome" type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />

                <label className='font-bold text-lg' htmlFor="email">Email:</label>
                <input className='pt-1 pb-1 mb-4 w-[20.7rem] border border-black rounded-lg' id="email" type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className='font-bold text-lg' htmlFor="telefone">Telefone:</label>
                <input className='pt-1 pb-1 mb-4 w-[20.7rem] border border-black rounded-lg' id="telefone" type="text" placeholder="Telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />

                <label className='font-bold text-lg' htmlFor="coordenada_x">Coordenada X:</label>
                <input className='pt-1 pb-1 mb-4 w-[20.7rem] border border-black rounded-lg' id="coordenada_x" type="text" placeholder="Coordenada X" required value={coordenada_x} onChange={(e) => setCoordenada_x(e.target.value)} />

                <label className='font-bold text-lg' htmlFor="coordenada_y">Coordenada Y:</label>
                <input className='pt-1 pb-1 mb-4 w-[20.7rem] border border-black rounded-lg' id="coordenada_y" type="text" placeholder="Coordenada Y" required value={coordenada_y} onChange={(e) => setCoordenada_y(e.target.value)} />
            </div>
            <div>
                <Button
                    text='Fechar'
                    onClick={fecharFormulario}
                    type="button"
                />
                <Button
                    text='Cadastrar'
                    type="submit"
                />
            </div>
        </form>
    );
};

export default ClienteForm;
