'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query';
import Header from '@/app/components/Header';
import { useSession } from 'next-auth/react';

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();
	return (
		<QueryClientProvider client={queryClient}>
			{session?.user && <Header />}
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			{children}
		</QueryClientProvider>
	);
}
