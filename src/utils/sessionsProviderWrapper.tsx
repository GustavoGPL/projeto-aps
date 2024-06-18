'use client';
import { SessionProvider, getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/app/components/Header';

export default function SessionProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathName = usePathname();
	const router = useRouter();

	const noHeaderRoutes = ['/login'];

	useEffect(() => {
		let isMounted = true; // Track whether the component is mounted

		const checkAuthentication = async () => {
			try {
				const session = await getSession();
				if (isMounted) {
					if (!session?.user && pathName !== '/login') {
						router.push('/login');
					} else if (session?.user && pathName === '/login') {
						router.push('/inicio');
					}
				}
			} catch (error) {
				console.error('Error checking authentication:', error);
			}
		};

		checkAuthentication();

		return () => {
			isMounted = false; // Cleanup function to set isMounted to false
		};
	}, [pathName, router]);

	return (
		<SessionProvider>
			<div>
				{!noHeaderRoutes.includes(pathName) && <Header />}
				{children}
			</div>
		</SessionProvider>
	);
}
