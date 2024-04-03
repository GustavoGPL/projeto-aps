"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProblemForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/problems/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Falha ao atualizar o problema");
      }

      router.push("/inicio");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-col w-1/2 p-[20px] shadow-lg shadow-slate-500 rounded-xl border border-slate-500 justify-center text-black">
        <form onSubmit={handleSubmit} className="flex justify-center p-6 flex-col gap-3 w-[100%]">
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className="border border-slate-500 px-3 py-2 rounded-[25px]"
            type="text"
            placeholder="Topic Title"
          />

          <input
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            className="border border-slate-500 px-3 py-2 rounded-[25px]"
            type="text"
            placeholder="Topic Description"
          />

          <div className="flex justify-center">
            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-[25px]">
              Atualizar Problema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}