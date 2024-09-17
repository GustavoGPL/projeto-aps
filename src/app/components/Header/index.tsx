'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
// import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
	const { data: session } = useSession();

	const userImage = session?.user?.image ?? undefined;

	const handleLogin = () => {
		if (!session?.user?.email) {
			redirect('/login');
		} else {
			redirect('/inicio');
		}
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Button
					onClick={() => {
						signOut();
						handleLogin();
					}}
				>
					Sair
				</Button>
			),
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				className="flex justify-center !bg-[#D7E6BC] h-24"
			>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link
							href="/inicio"
							className=" flex flex-row font-bold text-black text-3xl w-fit"
						>
							<b className="text-green-600">I</b>n
							<b className="text-green-600">F</b>raestrutura
						</Link>
					</Typography>
					<Dropdown
						className="hover:cursor-pointer"
						menu={{ items }}
						placement="bottomLeft"
						arrow
						trigger={['click']}
					>
						{userImage ? (
							<div className="w-12 h-12">
								<img
									className="rounded-full"
									src={userImage}
									alt="User Avatar"
								/>
							</div>
						) : (
							<Avatar icon={<UserOutlined />} />
						)}
					</Dropdown>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
