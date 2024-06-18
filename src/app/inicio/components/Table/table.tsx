import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { TProblems } from '@/types/problems';
import RemoveBtn from '@/app/components/RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
import Link from 'next/link';

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
				</div>
			),
		},
	];

	return <Table columns={columns} dataSource={problems} />;
}
