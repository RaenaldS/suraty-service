"use server";

import prisma from "@/lib/prisma";
import { PenghasilanSchema, PenghasilanEditSchema } from "@/src/schema/penghasilan";
import Penghasilan_Type from "@/src/types/penghasilan";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const savePenghasilan = async (data: Penghasilan_Type) => {
  const result = PenghasilanSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    const decoded = await decode({
      token: sessionToken,
      secret: String(process.env.NEXTAUTH_SECRET),
    });

    try {
      if (data.hasil_id)
              await prisma.penghasilan.update({
                data: {
                  hasil_nomor: data.hasil_nomor,
                  hasil_nama: data.hasil_nama,
                  hasil_umur: data.hasil_umur,
                  hasil_pekerjaan: data.hasil_pekerjaan,
                  hasil_alamat: data.hasil_alamat,
                  hasil_penghasilan: data.hasil_penghasilan,
              },
              where: {
                hasil_id: data.hasil_id
              }
            });
            else
            await prisma.penghasilan.create({
              data: {
                hasil_nomor: data.hasil_nomor,
                hasil_nama: data.hasil_nama,
                hasil_umur: data.hasil_umur,
                hasil_pekerjaan: data.hasil_pekerjaan,
                hasil_alamat: data.hasil_alamat,
                hasil_penghasilan: data.hasil_penghasilan,
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

export async function deletePenghasilan (id: number) {
  const res = await prisma.penghasilan.update({
    where: {hasil_id: id},
    data: { hasil_deleted: new Date() },
  })
  return res
}