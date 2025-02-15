import prisma from "@/lib/prisma";
// import {
//   users,
//   sktm,
//   jabatan,
// } from "../../../../prisma/generated/client/index";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { data } = await getTaniByID(id);

  return Response.json({ data });
}

const getTaniByID = async (id: number) => {
  const data = await prisma.tani.findUnique({
    where: { tani_id: Number(id) },
    include: {
      ttd_tani: {
        where: {
          user_jabatan: 1,
        },
        select: {
          user_nama: true,
          user_nip: true,
          user_email: true,
          user_hp: true,
          user_alamat: true,
          jabatan: {
            select: {
              jabatan_nama: true,
            },
          },
        },
      },
    },
  });

  return { data };
};
