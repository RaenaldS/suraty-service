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
import { deleteJabatan, saveJabatan } from "./action";
import { JabatanSchema } from "@/src/schema/jabatan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Jabatan_Type from "@/src/types/jabatan";
import clsx from "clsx";

type Inputs = z.infer<typeof JabatanSchema>;

const TableJabatan = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [edit, setEdit] = useState<Jabatan_Type>();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { jabatan_nama: edit?.jabatan_nama },
    resolver: zodResolver(JabatanSchema),
  });

  const getJabatan = async () => {
    const res = await fetch(
      `/api/jabatan?page=${page}&limit=${pageSize}&q=${search}`,
      { next: { tags: ["jabatan"] } }
    );
    const result = await res.json();
    setData(result);
    setFetching(false);
  };

  const showEdit = (id: number) => {
    setEdit(data.data.find((a: Jabatan_Type) => a.jabatan_id === id));
    reset(data.data.find((a: Jabatan_Type) => a.jabatan_id === id));
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
    const result = await saveJabatan(data);
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
    getJabatan();
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
        popup: "sweer-alerts",
      },
    }).then(async (result) => {
      if (result.value) {
        await deleteJabatan(id);
        showAlert("success", "Data berhasil dihapus!");
        getJabatan();
      }
    });
  };

  //Skin: Hover
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //     setPage(1);
  //     getJabatan();
  // }, [pageSize]);

  useEffect(() => {
    getJabatan();
  }, [page, pageSize, search]);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">
          Data Master Jabatan
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
            Add Jabatan
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
            { accessor: "jabatan_id", title: "ID" },
            { accessor: "jabatan_nama", title: "Nama Jabatan" },
            { accessor: "_count.users", title: "Jumlah Personil" },
            {
              accessor: "phone",
              title: "Action",
              render: ({ jabatan_id }: { jabatan_id: any }) => (
                <div className="mx-auto flex w-max items-center gap-2">
                  <span
                    onClick={() => showEdit(jabatan_id)}
                    className="cursor-pointer"
                  >
                    <IconPencil className="text-primary" />
                  </span>
                  <span
                    onClick={() => hapusData(jabatan_id)}
                    className="cursor-pointer"
                  >
                    <IconTrashLines className="text-danger" />
                  </span>
                </div>
              ),
            },
          ]}
          idAccessor="jabatan_id"
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
                  <h5 className="text-lg font-bold">Form Jabatan</h5>
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
                        "has-error": errors.jabatan_nama,
                      })}
                    >
                      <input
                        type="text"
                        placeholder="Nama Jabatan"
                        className="form-input"
                        {...register("jabatan_nama")}
                      />
                      {errors.jabatan_nama ? (
                        <div className="mt-1 text-danger">
                          {errors.jabatan_nama.message}
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

export default TableJabatan;
