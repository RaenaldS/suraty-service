import FormPegawai from '@/components/apps/mailbox/invoice/FormUser';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Add Pegawai',
};

const PegawaiAdd = () => {
    return <FormPegawai />;
};

export default PegawaiAdd;
