import { Metadata } from 'next';
import React from 'react';
import TableSkck from './TableSkck';
import prisma from '@/lib/prisma';
import { SkckEditSchema } from '@/src/schema/skck';

export const metadata: Metadata = {
    title: 'Data SKCK',
};


const Sktm = async () => {
    return <TableSkck  />;
};

export default Sktm;
