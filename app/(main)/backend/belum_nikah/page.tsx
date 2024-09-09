import { Metadata } from 'next';
import React from 'react';
import TableBelumNikah from './TableBelumNikah';
import prisma from '@/lib/prisma';
import { SktmEditSchema } from '@/src/schema/sktm';

export const metadata: Metadata = {
    title: 'Data SKTM',
};


const Sktm = async () => {
    return <TableBelumNikah  />;
};

export default Sktm;
