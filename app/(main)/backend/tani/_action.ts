"use server";

import prisma from "@/lib/prisma";
import { TaniSchema, TaniEditSchema } from "@/src/schema/tani";
import Tani_Type from "@/src/types/tani";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const saveTani = async (data: Tani_Type) => {
  const result = TaniSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    const decoded = await decode({
      token: sessionToken,
      secret: String(process.env.NEXTAUTH_SECRET),
    });

    try {
      if (data.tani_id)
        await prisma.tani.update({
          data: {
            tani_nomor: data.tani_nomor,
            tani_nama: data.tani_nama,
            tani_jabatan: data.tani_jabatan,
            tani_sekretariat: data.tani_sekretariat,
            tani_alamat: data.tani_alamat,
            tani_keperluan: data.tani_keperluan,
            tani_tujuanBantuan: data.tani_tujuanBantuan,
          },
          where: {
            tani_id: data.tani_id
          }
        });
      else
        await prisma.tani.create({
          data: {
            tani_nomor: data.tani_nomor,
            tani_nama: data.tani_nama,
            tani_jabatan: data.tani_jabatan,
            tani_sekretariat: data.tani_sekretariat,
            tani_alamat: data.tani_alamat,
            tani_keperluan: data.tani_keperluan,
            tani_tujuanBantuan: data.tani_tujuanBantuan,
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

export async function deleteTani(id: number) {
  const res = await prisma.tani.update({
    where: { tani_id: id },
    data: { tani_deleted: new Date() },
  })
  return res
}