"use client"

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="text-black p-10">
      <button onClick={() => signIn('google', { callbackUrl: "/inicio" })} className="bg-blue-500 p-3 rounded-[11px] text-white hover:bg-blue-700">Login com o google</button>
    </div>
  );
}