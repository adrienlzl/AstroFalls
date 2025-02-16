import React from "react";
import Image from "next/image";


export default function HomeComponent() {
	return (
		<div className="flex justify-center items-center"
				 id="home">
			<Image
				src="/images/astroFallLogo.webp"
				alt="AstroFalls Logo"
				id="logo"
				width={500}
				height={300}
				priority />
		</div>
	);
}