// import ComponentDashboard from "@/components/dashboard/components-dashboard-finance";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  return <h1>Selamat Datang</h1>;
};

export default Dashboard;
