import prisma from "@/lib/prisma";

// (BigInt.prototype as any).toJSON = function () {
//   return this.toString();
// };

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { data } = await getUserByID(params.id);

  return Response.json({ data });
}

const getUserByID = async (id: number) => {
  const data = await prisma.users.findUnique({
    where: { user_id: Number(id) },
    select: {
      // user_id: true,
      user_nama: true,
      user_email: true,
      user_hp: true,
      user_nip: true,
      user_alamat: true,
    },
  });
  return { data };
};
