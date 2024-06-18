import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import SessionProviderWrapper from '@/utils/sessionsProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'IFestrutura',
};

type TinitialProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: TinitialProps) {
	return (
		<SessionProviderWrapper>
			<html lang="en">
				<body className={inter.className}>
					{/* <Header /> */}
					<div className="h-[90vh]">{children}</div>
				</body>
			</html>
		</SessionProviderWrapper>
	);
}
