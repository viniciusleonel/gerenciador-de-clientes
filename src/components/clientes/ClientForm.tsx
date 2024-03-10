import React, { useState } from 'react';

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
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cadastrarCliente, clienteAtual }) => {
    const [nome, setNome] = useState(clienteAtual ? clienteAtual.nome : '');
    const [email, setEmail] = useState(clienteAtual ? clienteAtual.email : '');
    const [telefone, setTelefone] = useState(clienteAtual ? clienteAtual.telefone : '');
    const [coordenada_x, setCoordenada_x] = useState(clienteAtual ? clienteAtual.coordenada_x : '');
    const [coordenada_y, setCoordenada_y] = useState(clienteAtual ? clienteAtual.coordenada_y : '');
    const [active, setActive] = useState(!!clienteAtual);

    const handleDisplayForm = () => {
        setActive(!active);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Cliente</h2>
            <div>
                <label htmlFor="nome">Nome</label>
                <input id="nome" type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" type="text" placeholder="Telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />

                <label htmlFor="coordenada_x">Coordenada X</label>
                <input id="coordenada_x" type="text" placeholder="Coordenada X" required value={coordenada_x} onChange={(e) => setCoordenada_x(e.target.value)} />

                <label htmlFor="coordenada_y">Coordenada Y</label>
                <input id="coordenada_y" type="text" placeholder="Coordenada Y" required value={coordenada_y} onChange={(e) => setCoordenada_y(e.target.value)} />
            </div>
            <div>
                <button onClick={cancelarSubmit}>Fechar</button>
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    );
};

export default ClienteForm;
