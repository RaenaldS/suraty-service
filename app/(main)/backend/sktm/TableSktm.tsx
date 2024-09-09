"use client";
import IconDownload from "@/components/icon/icon-download";
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
import { deleteSktm, saveSktm } from "./_action";
import { SktmSchema } from "@/src/schema/sktm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import agama from "@/lib/agama";
import jk from "@/lib/jk";
import convertToJK from "@/lib/convert";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Sktm_Type from "@/src/types/sktm";
import clsx from "clsx";

type Inputs = z.infer<typeof SktmSchema>;

const TableSktm = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Sktm_Type>();
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
      sktm_nama: edit?.sktm_nama,
      sktm_tgl_lahir: edit?.sktm_tgl_lahir,
      sktm_tempat_lahir: edit?.sktm_tempat_lahir,
      sktm_suku: edit?.sktm_suku,
      sktm_agama: edit?.sktm_agama,
      sktm_jk: edit?.sktm_jk,
      sktm_noKtp: edit?.sktm_noKtp,
      sktm_pekerjaan: edit?.sktm_pekerjaan,
      sktm_alamat: edit?.sktm_alamat,
      sktm_dusun: edit?.sktm_dusun,
      sktm_kepentingan: edit?.sktm_kepentingan,
    },
    resolver: zodResolver(SktmSchema),
  });
  
  const downloadPdf = async (id: number) => {
    try {
      const response = await fetch(`/api/generateSktm?id=${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `SKTM_${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download PDF: ", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const loadModals = async () => {
    reset({});
    setShow(true);
  };

  const getSktm = async () => {
    const res = await fetch(
      `/api/sktm?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["sktm"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = async (id: number) => {
    setEdit(data.data.find((a: Sktm_Type) => a.sktm_id === id));
    reset(data.data.find((a: Sktm_Type) => a.sktm_id === id));
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
    const result = await saveSktm(data);
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
    getSktm();
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
        popup: "sweet-alerts"
      },
    }).then(async (result) => {
      if (result.value) {
        await deleteSktm(id);
        showAlert("success", "Data berhasil dihapus!");
        getSktm();
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
    getSktm();
    // getKegiatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Data Master SKTM
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
            Add SKTM
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
            { accessor: "sktm_id", title: "ID" },
            { accessor: "sktm_nama", title: "Yang Mengajukan" },
            { accessor: "sktm_alamat", title: "Alamat" },
            { accessor: "sktm_pekerjaan", title: "Pekerjaan" },
            { accessor: "sktm_kepentingan", title: "Kepentingan" },
            {
              accessor: "phone",
              title: "Action",
              render: ({ sktm_id }: { sktm_id: any }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(sktm_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(sktm_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                  <span
                    onClick={() => downloadPdf(sktm_id)}
                    className="cursor-pointer"
                  >
                    <IconDownload className="ltr:mr-2 rtl:ml-2" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="sktm_id"
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
                  <h5 className="text-lg font-bold">Form SKTM</h5>
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
                        "has-error": errors.sktm_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama"
                        className="form-input"
                        {...register("sktm_nama")}
                      />
                      {errors.sktm_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.sktm_nama.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                    <div
                        className={clsx("relative", {
                          "has-error": errors.sktm_tempat_lahir,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Tempat Lahir"
                          className="form-input"
                          {...register("sktm_tempat_lahir")}
                        />
                        {errors.sktm_tempat_lahir ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_tempat_lahir.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    <div
                      className={clsx(" flex items-center", {
                        "has-error": errors.sktm_tgl_lahir,
                      })}
                    >
                      <Flatpickr
                        placeholder="Tanggal Lahir"
                        options={{ dateFormat: "Y-m-d", position: "auto left" }}
                        className="form-input flex-1"
                        {...register("sktm_tgl_lahir")}
                        onChange={(date) => {
                          setValue("sktm_tgl_lahir", date[0]);
                        }}
                      />
                    </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row mt-4">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_suku,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Suku"
                          className="form-input"
                          {...register("sktm_suku")}
                        />
                        {errors.sktm_suku ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_suku.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_agama,
                        })}
                      >
                        <select
                          {...register("sktm_agama")}
                          className="form-select"
                        >
                          <option value="">Agama</option>
                          {agama.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                        {errors.sktm_agama ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_agama.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_noKtp,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Nomor KTP/NIK"
                          className="form-input"
                          {...register("sktm_noKtp")}
                        />
                        {errors.sktm_noKtp ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_noKtp.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_jk,
                        })}
                      >
                        <select
                          {...register("sktm_jk")}
                          className="form-select"
                        >
                          <option value="">Jenis Kelamin</option>
                          {jk.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                        {errors.sktm_jk ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_jk.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between lg:flex-row">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_alamat,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Alamat"
                          className="form-input"
                          {...register("sktm_alamat")}
                        />
                        {errors.sktm_alamat ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_alamat.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sktm_dusun,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Dusun"
                          className="form-input"
                          {...register("sktm_dusun")}
                        />
                        {errors.sktm_dusun ? (
                          <div className="mt-1 text-danger">
                            {errors.sktm_dusun.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.sktm_pekerjaan,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Pekerjaan"
                        className="form-input"
                        {...register("sktm_pekerjaan")}
                      />
                      {errors.sktm_pekerjaan ? (
                        <div className="mt-1 text-danger">
                          {errors.sktm_pekerjaan.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.sktm_kepentingan,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Kepentingan"
                        className="form-input"
                        {...register("sktm_kepentingan")}
                      />
                      {errors.sktm_kepentingan ? (
                        <div className="mt-1 text-danger">
                          {errors.sktm_kepentingan.message}
                        </div>
                      ) : (
                        ""
                      )}
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

export default TableSktm;
