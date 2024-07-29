'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditProblemForm({
	id,
	title,
	description,
	image,
}: {
	id: string;
	title: string;
	description: string;
	image: string;
}) {
	const [newTitle, setNewTitle] = useState(title);
	const [newDescription, setNewDescription] = useState(description);

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://localhost:3000/api/problems/${id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ newTitle, newDescription }),
			});

			if (!res.ok) {
				throw new Error('Falha ao atualizar o problema');
			}

			router.push('/inicio');
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
					<Image alt="" width={300} height={300} src={image} />
					<input
						onChange={e => setNewTitle(e.target.value)}
						value={newTitle}
						className="border border-slate-500 px-3 py-2 rounded-lg"
						type="text"
						placeholder="Título do Problema"
					/>

					<textarea
						onChange={e => setNewDescription(e.target.value)}
						value={newDescription}
						className="border border-slate-500 px-3 py-2 rounded-lg"
						placeholder="Descrição do Problema"
						rows={3}
					/>

					<div className="flex justify-center">
						<button className="bg-green-600 font-bold text-white py-2 px-4 rounded-full">
							Atualizar Problema
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
