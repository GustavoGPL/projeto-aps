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

export default function Header() {
	const { data: session } = useSession();

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
						handleLogin;
					}}
				>
					Sair
				</Button>
			),
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className="bg-[#D7E6BC]">
				<Toolbar>
					{/* <IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link href="/inicio" className=" flex flex-row font-bold">
							<div className="text-[#36A145]">IF</div>
							<div className="max-[640px]:hidden">raestrutura</div>
						</Link>
					</Typography>
					<Dropdown menu={{ items }} placement="bottomLeft" arrow>
						<Avatar size={40} icon={<UserOutlined />} />
					</Dropdown>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
