// import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const q = searchParams.get("q");
  const sortField = searchParams.get("sortField");
  const sortDirection = searchParams.get("sortDirection");
  //   const session = await getServerSession(authOptions);

  // if (!searchParams.get("page") || !searchParams.get("limit")) return Response.json({ message: "invalid" });
  const data = await prisma.jabatan.findMany({
    include: {
      _count: {
        select: {
          users: true,
        },
      },
    },
    take: limit ? limit : undefined,
    skip: page === 1 ? 0 : limit * (page - 1),
    where: {
      jabatan_nama: { contains: q ?? undefined },
      jabatan_deleted: null,
    },
    orderBy: sortField ? { [sortField]: sortDirection } : { jabatan_id: "asc" },
  });
  let total = 0;
  if (searchParams.get("page") && searchParams.get("limit"))
    total = await prisma.jabatan.count({
      where: {
        jabatan_nama: { contains: q ?? undefined },
        jabatan_deleted: null,
      },
    });

  return Response.json({ data, total });
}
