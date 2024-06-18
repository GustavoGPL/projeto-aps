'use client';
import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProblemTable from './components/Table/table';
import { TProblems } from '@/types/problems';
import { useSession } from 'next-auth/react';

export default function BasicTable() {
	const [problems, setProblems] = useState<TProblems[]>([]);
	const { data: session } = useSession();
	console.log('Session', session);

	const initFetch = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/problems');
			return response.data.problems;
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await initFetch();
			setProblems(data);
		}

		fetchData();
	}, []);

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
			<ProblemTable problems={problems} initFetch={initFetch} />
		</div>
	);
}
