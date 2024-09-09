import ComponentsAppsContacts from '@/components/apps/contacts/components-apps-contacts';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Data Pegawai',
};

const getPegawai = async () => {
    const result = await prisma.users.findMany();
    return result;
};

const Pegawai = async () => {
    const pegawai = await getPegawai();
    return <ComponentsAppsContacts pegawai={pegawai} />;
};

export default Pegawai;
