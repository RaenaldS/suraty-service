"use client";
import { deleteUser } from "@/app/(main)/backend/pegawai/_action";
import IconSearch from "@/components/icon/icon-search";
import IconUserPlus from "@/components/icon/icon-user-plus";
import IconX from "@/components/icon/icon-x";
// import pendidikan from '@/lib/pendidikan';
import dayjs from "dayjs";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ComponentsAppsContacts = ({ pegawai }: { pegawai: any }) => {
  const [defaultParams] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
  });

  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );

  const [search, setSearch] = useState<any>("");

  const [filteredItems, setFilteredItems] = useState<any>(pegawai);

  const searchContact = () => {
    setFilteredItems(() => {
      return pegawai?.filter((item: any) => {
        return item.user_nama.toLowerCase().includes(search.toLowerCase());
      });
    });
  };

  useEffect(() => {
    searchContact();
  }, [search]);

  const delUser = async (user: any = null) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
      customClass: {
        popup: "sweer-alerts",
      },
    }).then(async (result) => {
      if (result.value) {
        const res = await deleteUser(user.user_id);
        if (res) {
          setFilteredItems(
            filteredItems.filter((d: any) => d.user_id !== user.user_id)
          );
          showMessage("User has been deleted successfully.");
        }
      }
    });
  };

  const showMessage = (msg = "", type = "success") => {
    const toast: any = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">Pegawai</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            <div>
              <Link href="/pegawai/add">
                <button type="button" className="btn btn-primary">
                  <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                  Add Pegawai
                </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari Pegawai"
              className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredItems?.map((contact: any) => {
          return (
            <div
              className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]"
              key={contact.user_id}
            >
              <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]">
                <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                  <img
                    className="mx-auto max-h-40 w-4/5 object-contain"
                    src={`/api/image/users/${contact.user_image}`}
                    alt="contact_image"
                  />
                </div>
                <div className="relative -mt-10 px-6 pb-24">
                  <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                    <div className="text-xl">{contact.user_nama}</div>
                    {/* <div className="text-white-dark">
                      {contact.jabatan.jabatan_nama}
                    </div> */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      {/* <div className="flex-auto">
                                                <div className="text-info">{pendidikan.find((a) => a.id === contact.user_pendidikan_akhir)?.value}</div>
                                                <div>Pendidikan</div>
                                            </div> */}
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                      <div className="truncate text-white-dark">
                        {contact.user_email}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                      <div className="text-white-dark">{contact.user_hp}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">
                        Alamat :
                      </div>
                      <div className="text-white-dark">
                        {contact.user_alamat}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                  <Link
                    href={`/pegawai/edit/${contact.user_id}`}
                    className="btn-outline-primary btn w-1/2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn-outline-danger btn w-1/2"
                    onClick={() => delUser(contact)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentsAppsContacts;
