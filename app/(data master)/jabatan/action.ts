'use server';

import prisma from '@/lib/prisma';
import { JabatanSchema } from '@/src/schema/jabatan';
import Jabatan_Type from '@/src/types/jabatan';
import { Prisma } from '@prisma/client';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export const saveJabatan = async (data: Jabatan_Type) => {
    const result = JabatanSchema.safeParse(data);
    // console.log(data);
    if (result.success) {
        const sessionToken = cookies().get('next-auth.session-token')?.value ?? cookies().get('__Secure-next-auth.session-token')?.value;

        // const decoded = await decode({
        //     token: sessionToken,
        //     secret: String(process.env.NEXTAUTH_SECRET),
        // });
        
        try {
            if (data.jabatan_id)
                await prisma.jabatan.update({
                    data: {
                        jabatan_nama: data.jabatan_nama,
                    },
                    where: {
                        jabatan_id: data.jabatan_id,
                    },
                });
            else
                await prisma.jabatan.create({
                    data: {
                        jabatan_nama: data.jabatan_nama,
                    },
                });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return { success: false, error: e.message };
            }
            throw e;
        }
        return { success: true, data: result };
    } else {
        return { success: false, error: result.error.format() };
    }
};

export const deleteJabatan = async (jabatan_id: number) => {
    return await prisma.jabatan.update({
        data: { jabatan_deleted: new Date() },
        where: {
            jabatan_id: jabatan_id,
        },
    });
};
