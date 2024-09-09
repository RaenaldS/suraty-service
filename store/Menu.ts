import IconDollarSignCircle from "@/components/icon/icon-dollar-sign-circle";
import IconListCheck from "@/components/icon/icon-list-check";
import IconLock from "@/components/icon/icon-lock";
import IconNotes from "@/components/icon/icon-notes";
import IconSettings from "@/components/icon/icon-settings";
import IconUser from "@/components/icon/icon-user";
import IconUsers from "@/components/icon/icon-users";
import IconMenuChat from "@/components/icon/menu/icon-menu-chat";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconMenuMailbox from "@/components/icon/menu/icon-menu-mailbox";
import IconMenuTodo from "@/components/icon/menu/icon-menu-todo";

const menu = [
  { title: "Menu Utama" },
  {
    title: "Dashboard",
    icon: IconMenuDashboard,
    href: "/backend/dashboard",
  },
  {
    title: "SKTM",
    icon: IconNotes,
    href: "/backend/sktm",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Keterangan Belum Menikah",
    icon: IconNotes,
    href: "/backend/belum_nikah",
    // level: [1, 2, 3, 4],
  },
  {
    title: "SKCK",
    icon: IconNotes,
    href: "/backend/skck",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Keterangan Kehilangan",
    icon: IconNotes,
    href: "/backend/hilang",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Keterangan Penghasilan Tidak Tetap",
    icon: IconNotes,
    href: "/backend/penghasilan",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Rekomendasi Kelompok Tani",
    icon: IconNotes,
    href: "/backend/tani",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Data Master",
    // level: [1, 2, 3, 4],
  },
  {
    title: "SOTK",
    icon: IconUsers,
    href: "/pegawai",
    // level: [1, 2, 3, 4],
  },
  {
    title: "Jabatan",
    icon: IconMenuChat,
    href: "/jabatan",
    // level: [1, 2, 3, 4],
  },
  // {
  //     title: 'Tunjangan',
  //     icon: IconMenuMailbox,
  //     href: '/tunjangan',
  //     // level: [1, 2, 3, 4],
  // },
  // {
  //     title: 'Potongan',
  //     icon: IconMenuTodo,
  //     href: '/potongan',
  //     // level: [1, 2, 3, 4],
  // },
  // {
  //     title: 'Sub Kegiatan',
  //     icon: IconListCheck,
  //     href: '/kegiatan',
  //     // level: [1, 2, 3, 4],
  // },
  // {
  //     title: 'Sumber Dana',
  //     icon: IconDollarSignCircle,
  //     href: '/sumberdana',
  //     // level: [1, 2, 3, 4],
  // },
  {
    title: "Setting",
  },
  {
    title: "Setting",
    icon: IconSettings,
    href: "#",
    // level: [0],
    subMenu: [
      { title: "System", href: "#" },
      { title: "Log", href: "#" },
    ],
  },
  {
    title: "My Profile",
    icon: IconUser,
    href: "#",
  },
  {
    title: "Logout",
    icon: IconLock,
    href: "/logout",
  },
];
export default menu;
