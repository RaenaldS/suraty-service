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
  const { data } = await getHilangByID(id);

  return Response.json({ data });
}

const getHilangByID = async (id: number) => {
  const data = await prisma.kehilangan.findUnique({
    where: { hilang_id: Number(id) },
    include: {
      ttd_hilang: {
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
        // include: {
        //   jabatan: {
        //     select: {
        //       jabatan_nama: true,
        //     },
        //   },
        // },
        // orderBy: { user_id: "asc" },
      },
    },
  });

  return { data };
};
