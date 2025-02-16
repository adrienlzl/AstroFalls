import React from "react";
import Image from "next/image";


export default function HomeComponent() {
	return (
		<div className="flex justify-center items-center">
			<Image
				src="/images/astroFallLogo.webp"
				alt="AstroFalls Logo"
				className="w-150 h-150 rounded-full object-cover"
				width={500}
				height={300}
				priority />
		</div>
	);
}