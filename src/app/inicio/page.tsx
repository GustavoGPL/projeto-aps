"use client"
import React, { useEffect, useCallback, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from "../components/RemoveBtn"

type TProblems = {
  _id: string,
  title: string,
  description: string
}

export default function BasicTable() {
  const [problems, setProblems] = useState<TProblems[]>([]);

  const initFetch = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/problems');
      console.log("Response", response.data.problems);
      setProblems(response.data.problems);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initFetch();
  }, [])

  return (
    <div className='bg-white h-full text-black p-[15px]'>
      <div className='flex justify-end'>
        <Link href="/addProblem" className='bg-blue-500 hover:bg-blue-700 font-bold p-[10px] rounded-[25px] text-white'>Adicionar Problema</Link>
      </div>
      <div className='flex justify-end p-1'>
      </div>
      <TableContainer component={Paper} className='flex justify-center h-full'>
      <Table sx={{ minWidth: 650, borderRadius: 20 }} aria-label="simple table" className='max-h-[300px] rounded-[25px] '>
        <TableHead>
          <TableRow className="bg-gray-200">
            <TableCell className="px-4 py-2 font-bold">PROBLEMAS ESTRUTURAIS</TableCell>
            <TableCell className="px-4 py-2 text-center font-bold">DESCRIÇÃO</TableCell>
            <TableCell className="px-4 py-2 text-center font-bold">AÇÕES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems?.map((p) => (
            <TableRow
              key={p._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="px-4 py-2 text-lg">{p.title}</TableCell>
              <TableCell className="px-4 py-2 text-center text-lg">{p.description}</TableCell>
              <TableCell className="px-4 py-2 text-center text-lg">
              <div className="flex gap-5 justify-center">
                <RemoveBtn id={p._id} initFetch={initFetch}/>
                <Link href={`/editProblem/${p._id}`} className='bg-yellow-200 p-2 rounded-[50%]'>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
