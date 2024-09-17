import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Problem from '../../../../models/problem';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb', // Ajuste conforme necessário
		},
	},
};

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const { title, description, image, isActive, createdBy } = data;

		if (!title || !description || !image || !createdBy) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		await connectMongoDB();
		const newProblem = new Problem({
			title,
			description,
			image, // Salvar a string base64 diretamente
			isActive,
			createdBy,
		});
		await newProblem.save();

		return NextResponse.json({ message: 'Problema criado' }, { status: 201 });
	} catch (error) {
		console.error('Error creating problem:', error);
		return NextResponse.json(
			{ error: 'Failed to create problem' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	await connectMongoDB();
	const problems = await Problem.find();
	return NextResponse.json({ problems });
}

export async function DELETE(request: any) {
	const id = request.nextUrl.searchParams.get('id');
	await connectMongoDB();
	await Problem.findByIdAndDelete(id);
	return NextResponse.json({ message: 'Problema deletado' }, { status: 200 });
}
