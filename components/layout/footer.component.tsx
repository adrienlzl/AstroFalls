import React from 'react'
import Image from "next/image";
import Link from 'next/link'

export default function FooterComponent() {
	return (
		<footer>
			<div className="py-1">
				<span id="copyright">Copyright © 2025</span>
				<span className="mr-1 text-bold">Made with</span>
				<span id="heart">❤</span>
				<span className="mr-1 text-bold">in Bordeaux</span>
			</div>
			<div id="authors">
				<Image
					src="/images/linkedin.png"
					alt="LinkedIn"
					className="mr-2"
					width={22}
					height={22}/>
				<Link
					href="https://www.linkedin.com/in/adrien-lazaille-11767266/"
					target="_blank"
					className="linkedin-link mr-1"
					rel="noopener noreferrer">
						Adrien Lazaille
				</Link>
				<span>|</span>
				<Link
					href="https://www.linkedin.com/in/emmanuel-l-06350b167/"
					target="_blank"
					className="linkedin-link mx-1"
					rel="noopener noreferrer">Emmanuel Lefevre
				</Link>
				<span>|</span>
				<Link
					href="https://www.linkedin.com/in/corentin-beyries/"
					target="_blank"
					className="linkedin-link mx-1"
					rel="noopener noreferrer">Corentin Beyries
				</Link>
				<span>|</span>
				<Link
					href="https://www.linkedin.com/in/camille-hoareau-487782253/"
					target="_blank"
					className="linkedin-link ml-1"
					rel="noopener noreferrer">Camille Hoareau
				</Link>
			</div>
		</footer>
	)
}
