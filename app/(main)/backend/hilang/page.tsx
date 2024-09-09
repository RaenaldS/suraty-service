import { Metadata } from 'next';
import React from 'react';
import TableHilang from './TableHilang';
import prisma from '@/lib/prisma';
import { HilangEditSchema } from '@/src/schema/hilang';

export const metadata: Metadata = {
    title: 'Data SKTM',
};


const Hilang = async () => {
    return <TableHilang  />;
};

export default Hilang;
