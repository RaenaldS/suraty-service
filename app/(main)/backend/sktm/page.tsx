import { Metadata } from 'next';
import React from 'react';
import TableSktm from './TableSktm';
import prisma from '@/lib/prisma';
import { SktmEditSchema } from '@/src/schema/sktm';

export const metadata: Metadata = {
    title: 'Data SKTM',
};


const Sktm = async () => {
    return <TableSktm  />;
};

export default Sktm;
