import { Metadata } from 'next';
import React from 'react';
import TableTani from './TableTani';
import prisma from '@/lib/prisma';
import { TaniEditSchema } from '@/src/schema/tani';

export const metadata: Metadata = {
    title: 'Data Keterangan Kelompok Tani',
};


const Sktm = async () => {
    return <TableTani />;
};

export default Sktm;
