import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { TProblems } from '@/types/problems';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import RemoveBtn from '@/app/components/RemoveBtn';
import { CiShare2 } from 'react-icons/ci';

type TProblemTableProps = {
	problems: TProblems[];
	initFetch: () => void;
};

export default function ProblemTable({
	problems,
	initFetch,
}: TProblemTableProps) {
	const columns: TableProps<TProblems>['columns'] = [
		{
			title: 'Problemas Estruturais',
			dataIndex: 'title',
			key: 'problem',
		},
		{
			title: 'Descrição',
			dataIndex: 'description',
			responsive: ['sm'],
			key: 'descrição',
		},
		{
			title: 'Ações',
			key: 'acoes',
			render: (text: any, record: TProblems) => (
				<div className="flex gap-5 justify-center flex-row-reverse">
					<RemoveBtn id={record._id} initFetch={initFetch} />
					<Link
						href={`/editProblem/${record._id}`}
						className="bg-yellow-200 p-2 rounded-[50%]"
					>
						<HiPencilAlt size={24} />
					</Link>
					<Button
						type="default"
						className="p-2 rounded-[100px] h-10 bg-blue-500 hover:!bg-blue-500"
					>
						<CiShare2 size={24} color="white" />
					</Button>
				</div>
			),
		},
	];

	return <Table columns={columns} dataSource={problems} />;
}
