import React from "react";
import Image from "next/image";

import styles from "@/styles/modules/animations.module.scss";


export default function HomeComponent() {
	return (
		<div id="home">
			<Image
				id="logo"
				src="/images/astroFallLogo.webp"
				alt="AstroFalls Logo"
				className={ styles.grow }
				width={500}
				height={300}
				priority />
		</div>
	);
}
