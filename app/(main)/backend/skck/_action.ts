"use server";

import prisma from "@/lib/prisma";
import { SkckSchema, SkckEditSchema } from "@/src/schema/skck";
import Skck_Type from "@/src/types/skck";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const saveSkck = async (data: Skck_Type) => {
  const result = SkckSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    const decoded = await decode({
      token: sessionToken,
      secret: String(process.env.NEXTAUTH_SECRET),
    });

    try {
      if (data.skck_id)
              await prisma.skck.update({
                data: {
                  skck_nomor: data.skck_nomor,
                  skck_nama: data.skck_nama,
                  skck_tempat_lahir: data.skck_tempat_lahir,
                  skck_tanggal_lahir: data.skck_tanggal_lahir,
                  skck_jk: data.skck_jk,
                  skck_agama: data.skck_agama,
                  skck_statusKawin: data.skck_statusKawin,
                  skck_pekerjaan: data.skck_pekerjaan,
                  skck_suku: data.skck_suku,
                  skck_nik: data.skck_nik,
                  skck_alamat: data.skck_alamat,
                  skck_pendidikan_terakhir: data.skck_pendidikan_terakhir,
                  skck_kepentingan: data.skck_kepentingan
              },
              where: {
                skck_id: data.skck_id
              }
            });
            else
            await prisma.skck.create({
              data: {
                  skck_nomor: data.skck_nomor,
                  skck_nama: data.skck_nama,
                  skck_tempat_lahir: data.skck_tempat_lahir,
                  skck_tanggal_lahir: data.skck_tanggal_lahir,
                  skck_jk: data.skck_jk,
                  skck_agama: data.skck_agama,
                  skck_statusKawin: data.skck_statusKawin,
                  skck_pekerjaan: data.skck_pekerjaan,
                  skck_suku: data.skck_suku,
                  skck_nik: data.skck_nik,
                  skck_alamat: data.skck_alamat,
                  skck_pendidikan_terakhir: data.skck_pendidikan_terakhir,
                  skck_kepentingan: data.skck_kepentingan
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

export async function deleteSkck (id: number) {
  const res = await prisma.skck.update({
    where: {skck_id: id},
    data: { skck_deleted: new Date() },
  })
  return res
}