import FormUser from "@/components/apps/mailbox/invoice/FormUser";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Pegawai",
};

interface PegawaiProps {
  params?: {
    id?: number;
  };
}

const getPegawai = async (id: number) => {
  return await prisma.users.findUnique({ where: { user_id: id } });
};

const PegawaiAdd = async ({ params }: PegawaiProps) => {
  const data = await getPegawai(Number(params?.id));
  // console.log(data);
  if (data) data.user_pass = "";
  return <FormUser data={data} />;
};

export default PegawaiAdd;
