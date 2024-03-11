import React, { useState, useEffect, useRef } from 'react';
import Button from '../buttons/Button'

interface DropdownButtonProps {
    text: string;
    options: { label: string; onClick: () => void }[];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ text, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: { label: string; onClick: () => void }) => {
        option.onClick(); // Chama a função onClick da opção
        setIsOpen(false); // Fecha o dropdown após clicar em uma opção
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle bg-color-aqua px-10 py-2 mx-6 rounded-lg font-bold border hover:border-color-aqua hover:bg-custom-background hover:text-color-aqua" onClick={toggleDropdown}>
                {text}
            </button>
            {isOpen && (
                <ul className="dropdown-menu bg-custom-background text-color-aqua absolute mt-[1.3rem]">
                    {options.map((option, index) => (
                        <li
                            className="py-5 px-10 m-0 w-full cursor-pointer hover:bg-color-aqua hover:text-custom-background font-bold"
                            key={index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownButton;
