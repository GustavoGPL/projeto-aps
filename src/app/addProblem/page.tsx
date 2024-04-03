"use client"
import * as React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProblem() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!title || !description) {
        alert("Title and description are required.");
        return;
        }

        try {
        const res = await fetch("http://localhost:3000/api/problems", {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });

        if (res.ok) {
            router.push("/inicio");
        } else {
            throw new Error("Failed to create a topic");
        }
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div className="flex w-full p-[10px] justify-center text-black">  
            <form onSubmit={handleSubmit} className="p-[20px] rounded-xl border border-slate-500 flex justify-center flex-col gap-3 w-[50%] shadow-lg shadow-slate-500">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="border border-slate-500 px-8 py-2 rounded-[25px]"
                    type="text"
                    placeholder="Topic Title"
                />

                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="border border-slate-500 px-8 py-2 rounded-[25px]"
                    type="text"
                    placeholder="Topic Description"
                />

                <button
                    type="submit"
                    className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-[25px]"
                >
                    Adicionar Problema
                </button>
            </form>
        </div>
    );
}