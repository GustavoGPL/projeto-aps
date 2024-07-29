import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import SessionProviderWrapper from '@/utils/sessionsProviderWrapper';
import { getSession } from 'next-auth/react';
import QueryProvider from '../utils/queryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'IFestrutura',
};

type TinitialProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: TinitialProps) {
	const session = await getSession();
	return (
		<SessionProviderWrapper>
			<html lang="en">
				<body className={inter.className}>
					{/* <Header /> */}
					<div className="h-[90vh]">
						<QueryProvider>{children}</QueryProvider>
					</div>
				</body>
			</html>
		</SessionProviderWrapper>
	);
}
