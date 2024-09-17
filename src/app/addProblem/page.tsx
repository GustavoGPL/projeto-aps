'use client';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from 'antd';
import Link from 'next/link';

export default function AddProblem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState<string | null>(null);
	const router = useRouter();
	const { data: session } = useSession();

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !description) {
			alert('Title and description are required.');
			return;
		}

		try {
			const createdBy = session?.user?.email || '';
			const isActive = true;

			const requestBody: {
				title: string;
				description: string;
				image: string | null;
				isActive: boolean;
				createdBy: string;
			} = {
				title,
				description,
				image,
				isActive,
				createdBy,
			};

			const res = await fetch('http://localhost:3000/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (res.ok) {
				router.push('/inicio');
			} else {
				const errorData = await res.json();
				console.error('Error:', errorData);
				throw new Error('Failed to create a topic');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const base64 = await convertToBase64(file);
			setImage(base64);
		}
	};

	return (
		<section>
			<div className="p-10">
				<Link href={'/inicio'} className="text-slate-600 hover:text-black">
					<ArrowBackIosIcon />
					Voltar
				</Link>
			</div>
			<div className="flex justify-center mt-12">
				<div className="flex flex-col w-full md:max-w-[50%] md:p-6 md:shadow-lg md:shadow-slate-500 md:rounded-xl md:border md:border-slate-500 justify-center text-black">
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

						<input
							type="file"
							onChange={handleImageChange}
							className="border border-slate-500 px-3 py-2 rounded-lg"
						/>

						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-green-700 hover:bg-green-800  font-bold text-white py-2 px-4 rounded-full"
							>
								Adicionar Problema
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
