// /app/api/send-email/route.ts (Next.js 13+ with app directory)

import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail"; // Import fungsi dari lib

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(req: NextRequest) {
  const { name, email, phone, message }: FormData = await req.json();

  const emailBody = `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
    <h1 style="color: #4CAF50; text-align: center;">Pengaduan Baru</h1>
    <hr style="border: 1px solid #ddd;">
    <p><strong>Nama:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4CAF50;">${email}</a></p>
    <p><strong>Telepon:</strong> <a href="tel:${phone}" style="color: #4CAF50;">${phone}</a></p>
    <p><strong>Pesan:</strong></p>
    <div style="padding: 10px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
      ${message}
    </div>
    <hr style="border: 1px solid #ddd;">
    <p style="text-align: center; font-size: 12px; color: #888;">Email ini dikirimkan secara otomatis dari sistem pengaduan masyarakat desa Kerta Buana.</p>
  </div>
`;

  try {
    // Panggil fungsi sendMail yang ada di lib/mail.ts
    await sendMail({
      to: "desakertabuana24@gmail.com",
      name,
      subject: "Pengaduan Baru",
      body: emailBody,
    });

    return NextResponse.json({ message: "Email terkirim!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengirim email." },
      { status: 500 }
    );
  }
}
