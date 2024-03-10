import React from 'react'

interface ButtonProps {
    text: string
    onClick?: () => void
}

export default function button({text} : ButtonProps ) {
    return (
        <button className="bg-color-aqua px-10 py-2 mx-6 rounded-lg font-bold border border-black hover:border-color-aqua hover:bg-custom-background hover:text-color-aqua">{text}</button>
    )
}
