// import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
// import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const page = Number(searchParams.get('page'));
  // const limit = Number(searchParams.get('limit'));
  const q = searchParams.get("q");
  // const ttd = searchParams.get('ttd');
  const sortField = searchParams.get("sortField");
  const sortDirection = searchParams.get("sortDirection");
  //   const session = await getServerSession(authOptions);

  // if (!searchParams.get("page") || !searchParams.get("limit")) return Response.json({ message: "invalid" });
  const data = await prisma.skck.findMany({
    select: {
      skck_id: true,
      skck_nama: true,
      skck_tanggal_lahir: true,
      skck_tempat_lahir: true,
      skck_alamat: true,
      skck_kepentingan: true,
      skck_ttd: true,
      skck_agama: true,
      skck_jk: true,
      skck_nik: true,
      skck_pekerjaan: true,
      skck_created: true,
      ttd_skck: {
        select: {
          user_nama: true,
          jabatan: {
            select: {
              jabatan_nama: true,
            },
          },
        },
      },
    },
    // take: limit ? limit : undefined,
    // skip: page === 1 ? 0 : limit * (page - 1),
    where: {
      skck_nama: { contains: q ?? undefined },
      skck_deleted: null,
    },
    orderBy: sortField ? { [sortField]: sortDirection } : { skck_nama: "asc" },
  });
  let total = 0;
  //   if (searchParams.get("page") && searchParams.get("limit"))
  //     total = await prisma.users.count({ where: { user_nama: { contains: q ?? undefined }, user_level: { gt: 1 }, user_opd: Number(session?.user?.opd), user_deleted: null } });

  return Response.json({ data, total });
}
