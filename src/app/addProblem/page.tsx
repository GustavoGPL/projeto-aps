'use client';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProblem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!title || !description) {
			alert('Title and description are required.');
			return;
		}

		try {
			const res = await fetch('http://localhost:3000/api/problems', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ title, description }),
			});

			if (res.ok) {
				router.push('/inicio');
			} else {
				throw new Error('Failed to create a topic');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center mt-12">
			<div className="flex flex-col w-full md:max-w-md md:p-6 md:shadow-lg md:shadow-slate-500 md:rounded-xl md:border md:border-slate-500 justify-center text-black">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-3 px-4 md:px-0"
				>
					<input
						onChange={e => setTitle(e.target.value)}
						value={title}
						className="border border-slate-500 px-3 py-2 rounded-lg"
						type="text"
						placeholder="Título do Problema"
					/>

					<textarea
						onChange={e => setDescription(e.target.value)}
						value={description}
						className="border border-slate-500 px-3 py-2 rounded-lg"
						placeholder="Descrição do Problema"
						rows={3}
					/>

					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-green-600 font-bold text-white py-2 px-4 rounded-full"
						>
							Adicionar Problema
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
