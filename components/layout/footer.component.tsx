import React from 'react'
import Link from 'next/link'

export default function FooterComponent() {
	return (
		<div className="bg-dark w-full px-4 flex justify-center py-6">
			<div className="text-sm font-semibold py-1 flex flex-wrap items-center text-gray-400">
				<span className="text-black mr-1">Copyright © 2025</span>
				<span className="text-black mr-1">Made with</span>
				<span className="text-red-500 mr-1">❤</span>
				<span className="text-black mr-1">in Bordeaux by</span>
				<Link
					href="https://www.emmanuellefevre.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-black mr-1">Emmanuel Lefevre
				</Link>
				<span className="mr-1">, Corentin Beyries, Camille Hoareau et</span>
				<Link
					href="https://adrienlazaille.fr/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-black ml-1">Adrien Lazaille
				</Link>
			</div>
		</div>
	)
}
