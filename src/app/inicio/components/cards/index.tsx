'use client';
import RemoveBtn from '@/app/components/RemoveBtn';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

export default function CardProblems({
	id,
	title,
	description,
	image,
	createdBy,
	initFetch,
}: {
	id: string;
	title: string;
	description: string;
	image: string;
	createdBy: string;
	initFetch: () => void;
}) {
	const { data: session } = useSession();
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 max-w-auto rounded overflow-hidden border-[1px] border-gray-200 shadow-md bg-white p-4 hover:shadow-lg">
			<div className="flex items-center flex-col gap-6">
				<div className="flex w-full">{createdBy}</div>
				<div className="flex items-center flex-col md:flex-row">
					<Image
						alt={title}
						width={150}
						height={150}
						src={image}
						className="mb-4 md:mb-0 md:mr-4"
					/>
					<div className="flex flex-col text-center md:text-left">
						<div className="font-bold text-xl mb-2">{title}</div>
						<p className="text-gray-700 text-base">{description}</p>
					</div>
				</div>
			</div>

			<div>
				{session?.user?.email === 'gustavoguillan23@gmail.com' ||
				session?.user?.email === createdBy ? (
					<div className="flex flex-row items-baseline gap-3 space-y-2 md:flex-col md:gap-2 md:items-center">
						<Link
							href={`/editProblem/${id}`}
							className="bg-yellow-200 p-2 rounded-full flex items-center justify-center h-12 w-12 hover:bg-yellow-300"
						>
							<HiPencilAlt size={24} />
						</Link>
						<RemoveBtn id={id} initFetch={initFetch} />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
