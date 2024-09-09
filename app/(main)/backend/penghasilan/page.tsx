import { Metadata } from 'next';
import React from 'react';
import TablePenghasilan from './TablePenghasilan';
import prisma from '@/lib/prisma';
import { PenghasilanEditSchema } from '@/src/schema/penghasilan';

export const metadata: Metadata = {
    title: 'Data Keterangan Penghasilan',
};


const Sktm = async () => {
    return <TablePenghasilan  />;
};

export default Sktm;
