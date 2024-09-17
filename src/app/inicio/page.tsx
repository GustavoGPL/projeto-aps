'use client';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TProblems } from '@/types/problems';
import CardProblems from './components/cards';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import api from '@/services/api';

export default function BasicTable() {
	const [problems, setProblems] = useState<TProblems[]>([]);

	const initFetch = useCallback(async () => {
		try {
			const response = await api.get('/problems'); //Utilização da instancia do axios global, que vem da api
			setProblems(response.data.problems);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const { isPending } = useQuery({
		queryKey: ['getAllProblems'],
		queryFn: initFetch,
		refetchOnWindowFocus: false,
	});

	function classifySeverity(description: string): string {
		const criticalKeywords = [
			'quebrado',
			'explosão',
			'vazamento',
			'incêndio',
			'perigoso',
		];
		const mediumKeywords = ['falha', 'infiltração', 'lentidão'];

		const lowerDescription = description.toLowerCase();

		// Verifica se a descrição contém palavras de gravidade crítica
		for (const keyword of criticalKeywords) {
			if (lowerDescription.includes(keyword)) {
				return 'Crítico';
			}
		}

		// Verifica se a descrição contém palavras de gravidade média
		for (const keyword of mediumKeywords) {
			if (lowerDescription.includes(keyword)) {
				return 'Médio';
			}
		}

		// Caso não contenha palavras críticas ou médias, classifica como baixo
		return 'Baixo';
	}

	return (
		<div className="bg-white h-full text-black p-[15px]">
			<div className="flex justify-end">
				<Link
					href="/addProblem"
					className="bg-green-700 hover:bg-green-800 font-bold p-[10px] rounded-[25px] text-white"
				>
					Adicionar
				</Link>
			</div>
			<div className="flex justify-end p-1"></div>
			<div className="grid grid-cols-1 gap-4">
				{isPending ? (
					<div className="flex justify-center items-center h-full">
						<Skeleton />
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{problems.length > 0 ? (
							problems.map((card: any) => {
								const severity = classifySeverity(card?.description);

								return (
									<CardProblems
										key={card._id}
										id={card._id}
										title={card?.title}
										description={card?.description}
										image={card?.image}
										createdBy={card?.createdBy}
										severity={severity} // Exibe a severidade do problema
										initFetch={initFetch}
									/>
								);
							})
						) : (
							<p>Nenhum problema encontrado.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
