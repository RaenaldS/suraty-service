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
import { deletePenghasilan, savePenghasilan } from "./_action";
import { PenghasilanSchema } from "@/src/schema/penghasilan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import agama from "@/lib/agama";
import jk from "@/lib/jk";
import pendidikan from "@/lib/pendidikan";
import convertToJK from "@/lib/convert";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Penghasilan_Type from "@/src/types/penghasilan";
import clsx from "clsx";

type Inputs = z.infer<typeof PenghasilanSchema>;

const TablePenghasilan = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Penghasilan_Type>();
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
      hasil_nama: edit?.hasil_nama,
      hasil_umur: edit?.hasil_umur,
      hasil_pekerjaan: edit?.hasil_pekerjaan,
      hasil_alamat: edit?.hasil_alamat,
      hasil_penghasilan: edit?.hasil_penghasilan
    },
    resolver: zodResolver(PenghasilanSchema),
  });

  const loadModals = async () => {
    reset({});
    setShow(true);
  };

  const getPenghasilan = async () => {
    const res = await fetch(
      `/api/penghasilan?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["penghasilan"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = async (id: number) => {
    setEdit(data.data.find((a: Penghasilan_Type) => a.hasil_id === id));
    reset(data.data.find((a: Penghasilan_Type) => a.hasil_id === id));
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
    const result = await savePenghasilan(data);
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
    getPenghasilan();
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
        await deletePenghasilan(id);
        showAlert("success", "Data berhasil dihapus!");
        getPenghasilan();
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
    getPenghasilan();
    // getKegiatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Data Master Penghasilan Tidak Tetap
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
            Add
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
            { accessor: "skck_id", title: "ID" },
            { accessor: "skck_nama", title: "Yang Mengajukan" },
            { accessor: "skck_alamat", title: "Alamat" },
            { accessor: "skck_pekerjaan", title: "Pekerjaan" },
            { accessor: "skck_kepentingan", title: "Kepentingan" },
            {
              accessor: "phone",
              title: "Action",
              render: ({ skck_id }: { skck_id: any }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(skck_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(skck_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="skck_id"
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
                  <h5 className="text-lg font-bold">Form SKCK</h5>
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
                        "has-error": errors.hasil_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama"
                        className="form-input"
                        {...register("hasil_nama")}
                      />
                      {errors.hasil_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.hasil_nama.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                    <div
                        className={clsx("relative", {
                          "has-error": errors.hasil_umur,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Umur"
                          className="form-input"
                          {...register("hasil_umur")}
                        />
                        {errors.hasil_umur ? (
                          <div className="mt-1 text-danger">
                            {errors.hasil_umur.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative", {
                          "has-error": errors.hasil_pekerjaan,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Pekerjaan"
                          className="form-input"
                          {...register("hasil_pekerjaan")}
                        />
                        {errors.hasil_pekerjaan ? (
                          <div className="mt-1 text-danger">
                            {errors.hasil_pekerjaan.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.hasil_alamat,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Alamat"
                          className="form-input"
                          {...register("hasil_alamat")}
                        />
                        {errors.hasil_alamat ? (
                          <div className="mt-1 text-danger">
                            {errors.hasil_alamat.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.hasil_penghasilan,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Penghasilan (Rp)"
                          className="form-input"
                          {...register("hasil_penghasilan")}
                        />
                        {errors.hasil_penghasilan ? (
                          <div className="mt-1 text-danger">
                            {errors.hasil_penghasilan.message}
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

export default TablePenghasilan;
