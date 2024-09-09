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
// import { deleteSumberDana, saveSumberDana } from './action';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Jabatan_Type from "@/src/types/jabatan";
import clsx from "clsx";
import User_Type from "@/src/types/users";

type Inputs = z.infer<typeof SumberDanaSchema>;

const TableJabatan = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Sumberdana_Type>();
  const [kegiatan, setKegiatan] = useState<Kegiatan_Type[]>();
  const [users, setUsers] = useState<User_Type[]>();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      sd_nama: edit?.sd_nama,
      sd_tahun: edit?.sd_tahun,
      sd_kode_rekening: edit?.sd_kode_rekening,
      sd_kegiatan: edit?.sd_kegiatan,
      sd_jumlah: edit?.sd_jumlah,
      sd_pptk: edit?.sd_pptk,
      sd_pa: edit?.sd_pa,
      sd_bendahara: edit?.sd_bendahara,
    },
    // resolver: zodResolver(SumberDanaSchema),
  });

  const loadModals = async () => {
    if (!kegiatan) await getKegiatan();
    if (!users) await getUsers();
    reset({});
    setShow(true);
  };

  const getKegiatan = async () => {
    const res = await fetch(`/api/kegiatan`);
    const result = await res.json();
    setKegiatan(result.data);
  };

  const getUsers = async () => {
    const res = await fetch(`/api/users`);
    const result = await res.json();
    setUsers(result.data);
  };

  const getSumberdana = async () => {
    const res = await fetch(
      `/api/sumberdana?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["jabatan"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = async (id: number) => {
    if (!kegiatan) await getKegiatan();
    if (!users) await getUsers();
    setEdit(data.data.find((a: Sumberdana_Type) => a.sd_id === id));
    reset(data.data.find((a: Sumberdana_Type) => a.sd_id === id));
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
    const result = await saveSumberDana(data);
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
    getSumberdana();
  };

  const hapusData = async (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
      customClass: "sweet-alerts",
    }).then(async (result) => {
      if (result.value) {
        await deleteSumberDana(id);
        showAlert("success", "Data berhasil dihapus!");
        getSumberdana();
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
    getSumberdana();
    // getKegiatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Surat Keterangan Tidak Mampu
        </h5>
        <div className="flex">
          <button
            type="button"
            className="btn btn-primary mr-3"
            onClick={() => loadModals()}
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
            { accessor: "sd_id", title: "ID" },
            {
              accessor: "kegiatan.kegiatan_subkegiatan",
              title: "Yang Mengajukan",
            },
            { accessor: "sd_kode_rekening", title: "Alamat" },
            { accessor: "sd_nama", title: "Perihal" },
            // { accessor: "users.user_nama", title: "PPTK" },
            // {
            //   accessor: "sd_jumlah",
            //   title: "Nilai",
            //   render: ({
            //     sd_jumlah,
            //     sd_id,
            //   }: {
            //     sd_id: number;
            //     sd_jumlah: number;
            //   }) => formatNumber(sd_jumlah),
            //   textAlignment: "right",
            // },
            {
              accessor: "phone",
              title: "Action",
              render: ({
                sd_id,
                sd_jumlah,
              }: {
                sd_jumlah: number;
                sd_id: number;
              }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(sd_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(sd_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="sd_id"
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
                  <h5 className="text-lg font-bold">Form Sumber Dana</h5>
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
                        "has-error": errors.sd_kegiatan,
                      })}
                    >
                      <select
                        {...register("sd_kegiatan")}
                        className="form-select"
                      >
                        <option value="">Pilih Sub Kegiatan</option>
                        {kegiatan?.map((i) => (
                          <option key={i.kegiatan_id} value={i.kegiatan_id}>
                            {i.kegiatan_subkegiatan}
                          </option>
                        ))}
                      </select>
                      {errors.sd_kegiatan ? (
                        <div className="mt-1 text-danger">
                          {errors.sd_kegiatan.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={clsx("relative mb-4", {
                        "has-error": errors.sd_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama Rekening"
                        className="form-input"
                        {...register("sd_nama")}
                      />
                      {errors.sd_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.sd_nama.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sd_kode_rekening,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Kode Rekening"
                          className="form-input"
                          {...register("sd_kode_rekening")}
                        />
                        {errors.sd_kode_rekening ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_kode_rekening.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sd_jumlah,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Jumlah Anggaran"
                          className="form-input"
                          {...register("sd_jumlah")}
                        />
                        {errors.sd_jumlah ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_jumlah.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                      <div
                        className={clsx("relative mb-4 mr-2", {
                          "has-error": errors.sd_tahun,
                        })}
                      >
                        <input
                          type="text"
                          placeholder="Tahun"
                          className="form-input"
                          {...register("sd_tahun")}
                        />
                        {errors.sd_tahun ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_tahun.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sd_pptk,
                        })}
                      >
                        <select
                          {...register("sd_pptk")}
                          className="form-select"
                        >
                          <option value="">Pilih PPTK</option>
                          {users
                            ?.filter((a) => a.user_level === 5)
                            .map((i) => (
                              <option key={i.user_id} value={i.user_id}>
                                {i.user_nama}
                              </option>
                            ))}
                        </select>
                        {errors.sd_pptk ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_pptk.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                      <div
                        className={clsx("relative mb-4 mr-2", {
                          "has-error": errors.sd_bendahara,
                        })}
                      >
                        <select
                          {...register("sd_bendahara")}
                          className="form-select"
                        >
                          <option value="">Pilih Bendahara</option>
                          {users
                            ?.filter((a) => a.user_level === 6)
                            .map((i) => (
                              <option key={i.user_id} value={i.user_id}>
                                {i.user_nama}
                              </option>
                            ))}
                        </select>
                        {errors.sd_bendahara ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_bendahara.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={clsx("relative mb-4", {
                          "has-error": errors.sd_pa,
                        })}
                      >
                        <select {...register("sd_pa")} className="form-select">
                          <option value="">Pilih PA</option>
                          {users
                            ?.filter(
                              (a) => a.user_level === 3 || a.user_level === 4
                            )
                            .map((i) => (
                              <option key={i.user_id} value={i.user_id}>
                                {i.user_nama}
                              </option>
                            ))}
                        </select>
                        {errors.sd_pa ? (
                          <div className="mt-1 text-danger">
                            {errors.sd_pa.message}
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

export default TableJabatan;
