import { Metadata } from 'next';
import React from 'react';
import TableJabatan from './TableJabatan';

export const metadata: Metadata = {
    title: 'Data Master Jabatan',
};

const Skin = () => {
    return <TableJabatan />;
};

export default Skin;
