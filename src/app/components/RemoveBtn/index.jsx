"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id, initFetch }) {
  const router = useRouter();
  const removeProblem = async () => {
    const confirmed = confirm("Tem certeza?");

    if (confirmed) {
      try {
          const res = await fetch(`http://localhost:3000/api/problems?id=${id}`, {
          method: "DELETE",
            });
          if (res.ok) {
              location.reload();
          }
      } catch(error) {
          console.error(error);
      }
    }
  };

  return (
    <button onClick={removeProblem} className="text-white bg-red-400 p-2 rounded-[50%]">
      <HiOutlineTrash size={24} />
    </button>
  );
}