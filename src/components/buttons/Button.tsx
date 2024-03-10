import React from 'react'

interface ButtonProps {
    text: string
}

export default function button({text} : ButtonProps) {
    return (
        <button className="bg-color-aqua px-10 py-2 mx-6 rounded-lg font-bold">{text}</button>
    )
}
