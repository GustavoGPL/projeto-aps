import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from '../../../components/RemoveBtn';
import { TProblems } from '@/types/problems';

type TProblemTableProps = {
	problems: TProblems[];
	initFetch: () => void;
};

export default function ProblemTable({
	problems,
	initFetch,
}: TProblemTableProps) {
	return (
		<TableContainer component={Paper} className="flex justify-center h-full">
			<Table
				sx={{ minWidth: 650, borderRadius: 20 }}
				aria-label="simple table"
				className="max-h-[300px] rounded-[25px] "
			>
				<TableHead>
					<TableRow className="bg-gray-200">
						<TableCell className="px-4 py-2 font-bold">
							PROBLEMAS ESTRUTURAIS
						</TableCell>
						<TableCell className="px-4 py-2 text-center font-bold">
							DESCRIÇÃO
						</TableCell>
						<TableCell className="px-4 py-2 text-center font-bold">
							AÇÕES
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{problems?.map(p => (
						<TableRow
							key={p._id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell className="px-4 py-2 text-lg">{p.title}</TableCell>
							<TableCell className="px-4 py-2 text-center text-lg">
								{p.description}
							</TableCell>
							<TableCell className="px-4 py-2 text-center text-lg">
								<div className="flex gap-5 justify-center flex-row-reverse">
									<RemoveBtn id={p._id} initFetch={initFetch} />
									<Link
										href={`/editProblem/${p._id}`}
										className="bg-yellow-200 p-2 rounded-[50%]"
									>
										<HiPencilAlt size={24} />
									</Link>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
