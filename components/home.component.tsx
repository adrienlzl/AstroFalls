import React from "react";
import Image from "next/image";


export default function HomeComponent() {
	return (
		<div id="home">
			<Image
				id="logo"
				src="/images/astroFallLogo.webp"
				alt="AstroFalls Logo"
				width={500}
				height={300}
				priority />
		</div>
	);
}