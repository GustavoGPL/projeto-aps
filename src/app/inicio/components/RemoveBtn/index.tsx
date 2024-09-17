'use client';

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { Popconfirm, Button } from 'antd';
import React from 'react';

interface RemoveBtnProps {
	id: string;
	initFetch: () => void;
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({ id, initFetch }) => {
	const router = useRouter();

	const removeProblem = async () => {
		try {
			const res = await fetch(`http://localhost:3000/api/problems?id=${id}`, {
				method: 'DELETE',
			});

			if (res.ok) {
				location.reload();
			} else {
				console.error('Failed to delete the problem');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Popconfirm
			title="Tem certeza que deseja remover?"
			onConfirm={removeProblem}
			okText="Sim"
			cancelText="Não"
			okButtonProps={{
				style: { backgroundColor: 'red', borderColor: 'red', color: 'white' },
			}}
		>
			<Button
				type="primary"
				danger
				shape="circle"
				icon={<HiOutlineTrash size={24} />}
				style={{ height: '2.8rem', width: '2.8rem' }}
			/>
		</Popconfirm>
	);
};

export default RemoveBtn;
