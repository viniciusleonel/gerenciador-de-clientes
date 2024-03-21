import React, { useState } from 'react';
import Button from '../buttons/Button'
import { FiTrash} from 'react-icons/fi'
import { TfiPencil } from "react-icons/tfi"

interface SearchButtonProps {
    fecharTudo: () => void;
    excluirCliente: (id: any) => void;
    handleInputChange: any;
    handleKeyDown: any;
    cliente: any
}

export default function SearchButton ({fecharTudo, excluirCliente, handleInputChange, handleKeyDown, cliente} : SearchButtonProps) {

    return (
        <div>
            <input 
                className="me-6 ps-2 py-2 rounded-lg border-2 relative border-color-aqua focus:outline-none focus:bg-cyan-100"
                type="text"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Buscar cliente"
            />

            {cliente && (
                <main className='my-10 w-full md:max-w-2xl absolute right-[28%]'>
                <section className="flex flex-col gap-4 ">
                        <article 
                            className="w-full flex bg-white rounded p-2  hover:scale-105 duration-300"
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

                            <button className='bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-8 -top-3'>
                                <TfiPencil size={18} color='#fff' />
                            </button>
                            <button 
                                className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-3 hover:scale-110 duration-300'
                                onClick={() => excluirCliente(cliente.id)}  
                            >   <FiTrash size={18} color='#fff' />
                            </button>
                        </article>
                    
                    <div className=' flex justify-center'>
                        <Button
                            text='Fechar'
                            onClick={() => {fecharTudo()}}
                        ></Button>
                    </div>
                </section>
            </main>
            )} 
        </div>
    )
}