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
        <div className="w-full flex justify-center px-4">
            <main className="mt-4 w-full md:max-w-2xl">
                <h2 className='text-4xl ms-6 font-medium'>Cadastrar Cliente</h2>
                <form onSubmit={cadastrar} className='flex flex-col mt-4'>
                    <div className='flex flex-col ms-6'>
                        <label className='font-bold text-lg' htmlFor="nome">Nome:</label>
                        <input className='w-full mb-2 p-2 rounded border border-black ' id="nome" type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label className='font-bold text-lg' htmlFor="email">Email:</label>
                        <input className='w-full mb-3 p-2 rounded border border-black' id="email" type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className='font-bold text-lg' htmlFor="telefone">Telefone:</label>
                        <input className='w-full mb-3 p-2 rounded border border-black' id="telefone" type="text" placeholder="Telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />

                        <label className='font-bold text-lg' htmlFor="coordenada_x">Coordenada X:</label>
                        <input className='w-full mb-3 p-2 rounded border border-black' id="coordenada_x" type="text" placeholder="Coordenada X" required value={coordenada_x} onChange={(e) => setCoordenada_x(e.target.value)} />

                        <label className='font-bold text-lg' htmlFor="coordenada_y">Coordenada Y:</label>
                        <input className='w-full mb-3 p-2 rounded border border-black' id="coordenada_y" type="text" placeholder="Coordenada Y" required value={coordenada_y} onChange={(e) => setCoordenada_y(e.target.value)} />
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
                </main>
            </div>
    );
};

export default ClienteForm;
