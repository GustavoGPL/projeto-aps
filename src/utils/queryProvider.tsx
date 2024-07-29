'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query';
import Header from '@/app/components/Header';

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			{children}
		</QueryClientProvider>
	);
}
