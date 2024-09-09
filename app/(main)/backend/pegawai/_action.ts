"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/generated/client";
import { UserEditSchema, UserSchema } from "@/src/schema/users";
import { saveFileFromBuffer } from '@/lib/saveFile';
// import User_Type from "@/src/types/users";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// type Inputs = z.infer<typeof UserSchema>;

export async function saveUser(data: FormData) {
  const dt = JSON.parse(String(data.get("postData")));

  const file1 = data.get('image') as File;
  const fileList: File[] = [];
  fileList[0] = file1;
  dt.user_image = fileList;
  // dt.user_tgl_lahir = new Date(dt.user_tgl_lahir);
  // let nip = dt.user_nip.replace(/\s/g, "");
  const result = UserSchema.safeParse(dt);
  if (result.success) {
    // const sessionToken =
    //   cookies().get("next-auth.session-token")?.value ??
    //   cookies().get("__Secure-next-auth.session-token")?.value;

    // const decoded = await decode({
    //   token: sessionToken,
    //   secret: String(process.env.NEXTAUTH_SECRET),
    // });

    const namaFile = await saveFileFromBuffer(fileList[0], './public/users/');
    result.data.user_image = '';
    let nip = dt.user_nip.replace(/\s/g, '');

    try {
      await prisma.users.create({
        data: {
          user_nama: dt.user_nama,
          user_nip: nip.length > 0 ? nip : null,
          user_name: dt.user_name,
          // user_pass: await hash(dt.user_pass),
          user_pass: dt.user_pass,
          user_image: namaFile,
          user_level: dt.user_level,
          user_email: dt.user_email,
          user_hp: dt.user_hp,
          user_alamat: dt.user_alamat,
          user_jabatan: dt.user_jabatan,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        return { success: false, error: e.message };
      }
      throw e;
    }
    return { success: true, data: result };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export async function updateUser(data: FormData, user_id: number) {
  const dt = JSON.parse(String(data.get("postData")));
  const file1 = data.get("image") as File;
  // dt.user_tgl_lahir = new Date(dt.user_tgl_lahir);
  const fileList: File[] = [];
  fileList[0] = file1;
  dt.user_image = fileList;
  const result = UserEditSchema.safeParse(dt);
  // console.log('data saya', dt);
  // console.log(typeof dt.user_nip, dt.user_nip);
  if (result.success) {
    const namaFile = typeof file1 !== 'string' ? await saveFileFromBuffer(fileList[0], './public/users/') : undefined;
    result.data.user_image = '';
    let nip = dt.user_nip ? dt.user_nip.replace(/\s/g, "") : null;
    try {
      await prisma.users.update({
        data: {
          user_nama: dt.user_nama,
          user_nip: nip && nip.length > 0 ? nip : null,
          user_name: dt.user_name,
          // user_pass: dt.user_pass !== '' ? await hash(dt.user_pass) : undefined,
          user_pass: dt.user_pass !== "" ? dt.user_pass : undefined,
          user_image: namaFile,
          user_level: dt.user_level,
          user_email: dt.user_email,
          user_hp: dt.user_hp,
          user_alamat: dt.user_alamat,
          user_jabatan: dt.user_jabatan,
        },
        where: { user_id: user_id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        return { success: false, error: e.message };
      }
      throw e;
    }
    return { success: true, data: result };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export async function deleteUser(id: number) {
  const res = await prisma.users.update({
    where: { user_id: id },
    data: { user_deleted: new Date() },
  });
  return res;
}

// export async function coba(data: FormData) {
//   console.log("coba data", data);
//   const file = data.get("user_image") as File;
//   const dt: Inputs = JSON.parse(JSON.stringify(Object.fromEntries(data)));
//   dt.user_image = file;
//   console.log(dt);
//   const result = UserSchema.safeParse(dt);
// }
