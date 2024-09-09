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
import { deleteTani, saveTani } from "./_action";
import { TaniSchema } from "@/src/schema/tani";
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
import Tani_Type from "@/src/types/tani";
import clsx from "clsx";

type Inputs = z.infer<typeof TaniSchema>;

const TableTani = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Tani_Type>();
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
      tani_nama: edit?.tani_nama,
      tani_jabatan: edit?.tani_jabatan,
      tani_sekretariat: edit?.tani_sekretariat,
      tani_alamat: edit?.tani_alamat,
      tani_keperluan: edit?.tani_keperluan,
      tani_tujuanBantuan: edit?.tani_tujuanBantuan,
    },
    resolver: zodResolver(TaniSchema),
  });

  const loadModals = async () => {
    reset({});
    setShow(true);
  };

  const getTani = async () => {
    const res = await fetch(
      `/api/tani?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["tani"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = async (id: number) => {
    setEdit(data.data.find((a: Tani_Type) => a.tani_id === id));
    reset(data.data.find((a: Tani_Type) => a.tani_id === id));
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
    const result = await saveTani(data);
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
    getTani();
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
        await deleteTani(id);
        showAlert("success", "Data berhasil dihapus!");
        getTani();
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
    getTani();
    // getKegiatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Data Master Rekomendasi Kelompok Tani
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
            { accessor: "tani_id", title: "ID" },
            { accessor: "tani_nama", title: "Yang Mengajukan" },
            { accessor: "tani_jabatan", title: "Jabatan" },
            { accessor: "tani_sekretariat", title: "Sekretariat" },
            { accessor: "tani_kepentingan", title: "Kepentingan" },
            {
              accessor: "phone",
              title: "Action",
              render: ({ tani_id }: { tani_id: any }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(tani_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(tani_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="tani_id"
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
                        "has-error": errors.tani_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama"
                        className="form-input"
                        {...register("tani_nama")}
                      />
                      {errors.tani_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.tani_nama.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                    <div
                        className={clsx("relative", {
                          "has-error": errors.tani_jabatan,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Jabatan"
                          className="form-input"
                          {...register("tani_jabatan")}
                        />
                        {errors.tani_sekretariat ? (
                          <div className="mt-1 text-danger">
                            {errors.tani_sekretariat.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative", {
                          "has-error": errors.tani_alamat,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Alamat"
                          className="form-input"
                          {...register("tani_alamat")}
                        />
                        {errors.tani_alamat ? (
                          <div className="mt-1 text-danger">
                            {errors.tani_alamat.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.tani_keperluan,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Keperluan"
                          className="form-input"
                          {...register("tani_keperluan")}
                        />
                        {errors.tani_keperluan ? (
                          <div className="mt-1 text-danger">
                            {errors.tani_keperluan.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.tani_tujuanBantuan,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Ditujukan Kepada"
                          className="form-input"
                          {...register("tani_tujuanBantuan")}
                        />
                        {errors.tani_tujuanBantuan? (
                          <div className="mt-1 text-danger">
                            {errors.tani_tujuanBantuan.message}
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

export default TableTani;
