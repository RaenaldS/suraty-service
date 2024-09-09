import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma'; // Sesuaikan dengan lokasi Prisma client Anda

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Ambil data dari database berdasarkan ID
    const data = await prisma.belumNikah.findUnique({
      where: { nikah_id: Number(id) },
    });

    if (!data) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
