"use server";

import prisma from "@/lib/prisma";
import { BelumNikahSchema, BelumNikahEditSchema } from "@/src/schema/belumnikah";
import Belumnikah_Type from "@/src/types/belumnikah";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const saveNikah = async (data: Belumnikah_Type) => {
  const result = BelumNikahSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    // const decoded = await decode({
    //   token: sessionToken,
    //   secret: String(process.env.NEXTAUTH_SECRET),
    // });

    try {
      if (data.nikah_id)
        await prisma.belumNikah.update({
          data: {
            nikah_nomor: data.nikah_nomor,
            nikah_nama: data.nikah_nama,
            nikah_jk: data.nikah_jk,
            nikah_tempat_lahir: data.nikah_tempat_lahir,
            nikah_suku: data.nikah_suku,
            nikah_agama: data.nikah_agama,
            nikah_nik: data.nikah_nik,
            nikah_alamat: data.nikah_alamat,
            nikah_kepentingan: data.nikah_kepentingan,
          },
          where: {
            nikah_id: data.nikah_id
          },
        });
      else
        await prisma.belumNikah.create({
          data: {
            nikah_nomor: data.nikah_nomor,
            nikah_nama: data.nikah_nama,
            nikah_jk: data.nikah_jk,
            nikah_tempat_lahir: data.nikah_tempat_lahir,
            nikah_tgl_lahir: data.nikah_tgl_lahir,
            nikah_suku: data.nikah_suku,
            nikah_agama: data.nikah_agama,
            nikah_nik: data.nikah_nik,
            nikah_alamat: data.nikah_alamat,
            nikah_kepentingan: data.nikah_kepentingan,
          }
        })

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return { success: false, error: e.message }
      }
      throw e;
    }
    return { success: true, data: result };
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export async function deleteNikah(id: number) {
  const res = await prisma.belumNikah.update({
    where: { nikah_id: id },
    data: { nikah_deleted: new Date() },
  })
  return res
}