import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Problem from "../../../../models/problem";

export async function POST(request: any) {
    const {title, description} = await request.json();
    await connectMongoDB();
    await Problem.create({ title, description });
    return NextResponse.json({ message: "Problema criado" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const problems = await Problem.find();
    return NextResponse.json({ problems });
}

export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Problem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Problema deletado" }, { status: 200 });
}