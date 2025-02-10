import React from 'react';
import Image from "next/image";

export default function FooterComponent() {

    const currentDate = new Date().getFullYear();

    return (
        <div className={"bg-dark w-full px-4 flex justify-center py-6"}>
            <div className="text-sm text-black font-semibold py-1 flex">
                Copyright © {currentDate} Made with <span className={"text-red-500 mx-1"}>❤</span> in Bordeaux by Emmanuel Lefevre, Corentin Beyries et Adrien Lazaille
            </div>
        </div>
    )
}
