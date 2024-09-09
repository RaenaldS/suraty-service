import prisma from "@/lib/prisma";

// (BigInt.prototype as any).toJSON = function () {
//   return this.toString();
// };

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { data } = await getJabatanByID(params.id);

  return Response.json({ data });
}

const getJabatanByID = async (id: number) => {
  const data = await prisma.users.findUnique({
    where: { user_id: Number(id) },
    select: {
      // user_id: true,
      user_nama: true,
      user_nip: true,
      user_jabatan: true,
      user_alamat: true,
    },
  });
  return { data };
};
