import connectMongoDB from "../../../../../libs/mongodb";
import Problem from "../../../../../models/problem";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Problem.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Problem.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}