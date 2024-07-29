'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSignIn = async () => {
		setLoading(true);
		setError(null);

		try {
			await signIn('google');
		} catch (err) {
			// setError('Falha ao fazer login. Por favor, tente novamente.');
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center top-1/4 justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-10 rounded shadow-md text-center text-black">
				<h1 className="text-2xl mb-4">Bem-vindo</h1>
				<p className="mb-4">Faça login para continuar</p>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				<button
					onClick={handleSignIn}
					className="bg-blue-500 p-3 rounded-[11px] text-white hover:bg-blue-700 flex items-center justify-center"
					disabled={loading}
				>
					{loading ? (
						<svg
							className="animate-spin h-5 w-5 mr-3 text-white"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8H4z"
							></path>
						</svg>
					) : (
						<>
							<FaGoogle className="mr-2" /> Login com o Google
						</>
					)}
				</button>
			</div>
		</div>
	);
}
