"use client";
import IconPencil from "@/components/icon/icon-pencil";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconX from "@/components/icon/icon-x";
import { IRootState } from "@/store";
import { Dialog, Transition } from "@headlessui/react";
// import Tippy from '@tippyjs/react';
import { DataTable } from "mantine-datatable";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteHilang, saveHilang } from "./_action";
import { HilangSchema } from "@/src/schema/hilang";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import agama from "@/lib/agama";
import jk from "@/lib/jk";
// import convertToJK from "@/lib/convert";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Hilang_Type from "@/src/types/hilang";
import clsx from "clsx";

type Inputs = z.infer<typeof HilangSchema>;

const TableHilang = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Hilang_Type>();
  // const [kegiatan, setKegiatan] = useState<Kegiatan_Type[]>();
  // const [users, setUsers] = useState<User_Type[]>();

  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      hilang_nama: edit?.hilang_nama,
      hilang_jk: edit?.hilang_jk,
      hilang_umur: edit?.hilang_umur,
      hilang_pekerjaan: edit?.hilang_pekerjaan,
      hilang_alamat: edit?.hilang_alamat,
    },
    resolver: zodResolver(HilangSchema),
  });

  const loadModals = async () => {
    reset({});
    setShow(true);
  };

  const getHilang = async () => {
    const res = await fetch(
      `/api/hilang?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["kehilangan"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = async (id: number) => {
    setEdit(data.data.find((a: Hilang_Type) => a.hilang_id === id));
    reset(data.data.find((a: Hilang_Type) => a.hilang_id === id));
    setShow(true);
  };

  const showAlert = async (
    jenis: SweetAlertIcon = "success",
    pesan = "Data berhasil disimpan"
  ) => {
    const toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: jenis,
      title: pesan,
      padding: "10px 20px",
    });
  };

  const onFormError: SubmitErrorHandler<any> = (e) => {
    console.log(e);
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    // const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
    const result = await saveHilang(data);
    // console.log(result);
    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      setShow(false);
      showAlert("error", "Data gagal simpan");
      return;
    }
    reset({});
    setShow(false);
    showAlert();
    getHilang();
  };

  const hapusData = async (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
      customClass: {
        popup: "sweet-alerts",
      },
    }).then(async (result) => {
      if (result.value) {
        await deleteHilang(id);
        showAlert("success", "Data berhasil dihapus!");
        getHilang();
      }
    });
  };

  //Skin: Hover
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //     setPage(1);
  //     getSumberdana();
  // }, [pageSize]);

  useEffect(() => {
    getHilang();
    // getKegiatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Data Master Keterangan Kehilangan
        </h5>
        <div className="flex">
          <button
            type="button"
            className="btn btn-primary mr-3"
            onClick={() => {
              reset({});
              setShow(true);
            }}
          >
            <IconPlus className="ltr:mr-2 rtl:ml-2" />
            Add Keterangan Kehilangan
          </button>
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={data?.data}
          columns={[
            { accessor: "hilang_id", title: "ID" },
            { accessor: "hilang_nama", title: "Yang Mengajukan" },
            { accessor: "hilang_alamat", title: "Alamat" },
            { accessor: "hilang_pekerjaan", title: "Pekerjaan" },
            {
              accessor: "phone",
              title: "Action",
              render: ({ hilang_id }: { hilang_id: any }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(hilang_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(hilang_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="hilang_id"
          fetching={fetching}
          totalRecords={data?.total}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          open={show}
          onClose={() => {
            setShow(false);
            reset({});
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div
            id="fadein_right_modal"
            className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
          >
            <div className="flex min-h-screen items-start justify-center px-4">
              <Dialog.Panel
                className={`panel animate__animated my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-5 text-black dark:text-white-dark ${
                  isRtl ? "animate__fadeInLeft" : "animate__fadeInRight"
                }`}
              >
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                  <h5 className="text-lg font-bold">Form Keterangan Kehilangan</h5>
                  <button
                    onClick={() => setShow(false)}
                    type="button"
                    className="text-white-dark hover:text-dark"
                  >
                    <IconX />
                  </button>
                </div>
                <div className="p-5">
                  <form onSubmit={handleSubmit(processForm, onFormError)}>
                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.hilang_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama"
                        className="form-input"
                        {...register("hilang_nama")}
                      />
                      {errors.hilang_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.hilang_nama.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.hilang_umur,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Umur"
                        className="form-input"
                        {...register("hilang_umur")}
                      />
                      {errors.hilang_umur ? (
                        <div className="mt-1 text-danger">
                          {errors.hilang_umur.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.hilang_jk,
                        })}
                      >
                        <select
                          {...register("hilang_jk")}
                          className="form-select"
                        >
                          <option value="">Jenis Kelamin</option>
                          {jk.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                        {errors.hilang_jk ? (
                          <div className="mt-1 text-danger">
                            {errors.hilang_jk.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      </div>

                      <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.hilang_pekerjaan,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Pekerjaan"
                        className="form-input"
                        {...register("hilang_pekerjaan")}
                      />
                      {errors.hilang_pekerjaan ? (
                        <div className="mt-1 text-danger">
                          {errors.hilang_pekerjaan.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.hilang_alamat,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Alamat"
                        className="form-input"
                        {...register("hilang_alamat")}
                      />
                      {errors.hilang_alamat ? (
                        <div className="mt-1 text-danger">
                          {errors.hilang_alamat.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                    <div
                        className={clsx("relative", {
                          "has-error": errors.hilang_hari,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Hari Kehilanganr"
                          className="form-input"
                          {...register("hilang_hari")}
                        />
                        {errors.hilang_hari ? (
                          <div className="mt-1 text-danger">
                            {errors.hilang_hari.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    
                      <div
                        className={clsx("relative", {
                          "has-error": errors.hilang_barang,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Nama Barang"
                          className="form-input"
                          {...register("hilang_barang")}
                        />
                        {errors.hilang_barang ? (
                          <div className="mt-1 text-danger">
                            {errors.hilang_barang.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.hilang_dari,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Lokasi hilang dari"
                          className="form-input"
                          {...register("hilang_dari")}
                        />
                        {errors.hilang_dari ? (
                          <div className="mt-1 text-danger">
                            {errors.hilang_dari.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.hilang_ke,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Lokasi hilang sampai ke"
                          className="form-input"
                          {...register("hilang_ke")}
                        />
                        {errors.hilang_ke ? (
                          <div className="mt-1 text-danger">
                            {errors.hilang_ke.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end">
                      <button
                        onClick={() => setShow(false)}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Discard
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TableHilang;
