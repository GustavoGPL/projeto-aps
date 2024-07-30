'use client';
import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { TProblems } from '@/types/problems';
import { useSession } from 'next-auth/react';
import CardProblems from './components/cards';
import { useQuery } from '@tanstack/react-query';

export default function BasicTable() {
	const [problems, setProblems] = useState<TProblems[]>([]);
	// const { data: session } = useSession();
	// console.log('Session', session);
	// // console.log('Imagem', image);

	const initFetch = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/problems');
			setProblems(response?.data?.problems);
			return response;
		} catch (error) {
			console.log(error);
		}
	}, []);

	const { isPending } = useQuery({
		queryKey: ['getAllProblems'],
		queryFn: initFetch,
	});

	return (
		<div className="bg-white h-full text-black p-[15px]">
			<div className="flex justify-end">
				<Link
					href="/addProblem"
					className="bg-blue-500 hover:bg-blue-700 font-bold p-[10px] rounded-[25px] text-white"
				>
					Adicionar
				</Link>
			</div>
			<div className="flex justify-end p-1"></div>
			<div className="grid grid-cols-1 gap-4">
				{problems
					? problems.map((card: any, index: any) => (
							<CardProblems
								key={card._id}
								id={card._id}
								title={card?.title}
								description={card?.description}
								image={card?.image}
								createdBy={card?.createdBy}
								initFetch={initFetch}
							/>
					  ))
					: ''}
			</div>
		</div>
	);
}
