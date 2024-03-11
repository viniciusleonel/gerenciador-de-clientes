import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: () => void;
}

export default function Button({ text, onClick, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            onClick={onClick} // Adicionei a propriedade onClick ao botão
            className="bg-color-aqua px-10 py-2 mx-6 rounded-lg font-bold border border-black hover:border-color-aqua hover:bg-custom-background hover:text-color-aqua"
        >
            {text}
        </button>
    );
}
