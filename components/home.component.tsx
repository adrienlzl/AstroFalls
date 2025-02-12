import React from "react";
import Image from "next/image";

export default function HomeComponent() {
    return (
        <div className={"flex justify-center items-center"}>
            <Image
                src="/images/astroFallLogo.webp"
                alt="logo AstroFall"
                width={500}
                height={300}
            />
        </div>
    );
}