"use server";

import prisma from "@/lib/prisma";
import { SktmSchema, SktmEditSchema } from "@/src/schema/sktm";
import Sktm_Type from "@/src/types/sktm";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const saveSktm = async (data: Sktm_Type) => {
  const result = SktmSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    // const decoded = await decode({
    //   token: sessionToken,
    //   secret: String(process.env.NEXTAUTH_SECRET),
    // });

    try {
      if (data.sktm_id)
              await prisma.sktm.update({
                data: {
                  sktm_noSurat: data.sktm_noSurat,
                  sktm_nama: data.sktm_nama,
                  sktm_tgl_lahir: data.sktm_tgl_lahir,
                  sktm_tempat_lahir: data.sktm_tempat_lahir,
                  sktm_suku: data.sktm_suku,
                  sktm_agama: data.sktm_agama,
                  sktm_jk: data.sktm_jk,
                  sktm_noKtp: data.sktm_noKtp,
                  sktm_pekerjaan: data.sktm_pekerjaan,
                  sktm_alamat: data.sktm_alamat,
                  sktm_dusun: data.sktm_dusun,
                  sktm_kepentingan: data.sktm_kepentingan,
              },
              where: {
                sktm_id: data.sktm_id
              }
            });
            else
            await prisma.sktm.create({
              data: {
                sktm_noSurat: data.sktm_noSurat,
                sktm_nama: data.sktm_nama,
                sktm_tgl_lahir: data.sktm_tgl_lahir,
                sktm_tempat_lahir: data.sktm_tempat_lahir,
                sktm_suku: data.sktm_suku,
                sktm_agama: data.sktm_agama,
                sktm_jk: data.sktm_jk,
                sktm_noKtp: data.sktm_noKtp,
                sktm_pekerjaan: data.sktm_pekerjaan,
                sktm_alamat: data.sktm_alamat,
                sktm_dusun: data.sktm_dusun,
                sktm_kepentingan: data.sktm_kepentingan,
            }
          })

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {success: false, error: e.message}
      }
      throw e;
    }
    return { success: true, data: result };
  }
  if(result.error) {
    return {success: false, error: result.error.format() };
  } 
};

export async function deleteSktm (id: number) {
  const res = await prisma.sktm.update({
    where: {sktm_id: id},
    data: { sktm_deleted: new Date() },
  })
  return res
}