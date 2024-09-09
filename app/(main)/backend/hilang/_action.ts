"use server";

import prisma from "@/lib/prisma";
import { HilangSchema, HilangEditSchema } from "@/src/schema/hilang";
import Hilang_Type from "@/src/types/hilang";
import { Prisma } from "@prisma/client";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const saveHilang = async (data: Hilang_Type) => {
  const result = HilangSchema.safeParse(data);

  if (result.success) {
    const sessionToken =
      cookies().get("next-auth.session-token")?.value ??
      cookies().get("__Secure-next-auth.session-token")?.value;

    const decoded = await decode({
      token: sessionToken,
      secret: String(process.env.NEXTAUTH_SECRET),
    });

    try {
      if (data.hilang_id)
        await prisma.kehilangan.update({
          data: {
            hilang_nomor: data.hilang_nomor,
            hilang_nama: data.hilang_nama,
            hilang_jk: data.hilang_jk,
            hilang_umur: data.hilang_umur,
            hilang_pekerjaan: data.hilang_pekerjaan,
            hilang_alamat: data.hilang_alamat,
          },
          where: {
            hilang_id: data.hilang_id
          }
        });
      else
        await prisma.kehilangan.create({
          data: {
            hilang_nomor: data.hilang_nomor,
            hilang_nama: data.hilang_nama,
            hilang_jk: data.hilang_jk,
            hilang_umur: data.hilang_umur,
            hilang_pekerjaan: data.hilang_pekerjaan,
            hilang_alamat: data.hilang_alamat,
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

export async function deleteHilang(id: number) {
  const res = await prisma.kehilangan.update({
    where: { hilang_id: id },
    data: { hilang_deleted: new Date() },
  })
  return res
}