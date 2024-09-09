// import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
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
  const data = await prisma.users.findMany({
    select: {
      user_id: true,
      user_nama: true,
      user_name: true,
      user_nip: true,
      user_email: true,
      user_hp: true,
      user_alamat: true,
      jabatan: {
        select: { jabatan_nama: true},
      }
    },
    // take: limit ? limit : undefined,
    // skip: page === 1 ? 0 : limit * (page - 1),
    where: {
      user_nama: { contains: q ?? undefined },
      user_level: {gt: 1},
      user_deleted: null,
      // jabatan: { jabatan_ttd: ttd ? true : undefined },
    },
    orderBy: sortField ? { [sortField]: sortDirection } : { user_nama: "asc" },
  });
  let total = 0;
  //   if (searchParams.get("page") && searchParams.get("limit"))
  //     total = await prisma.users.count({ where: { user_nama: { contains: q ?? undefined }, user_level: { gt: 1 }, user_opd: Number(session?.user?.opd), user_deleted: null } });

  return Response.json({ data, total });
}
