"use client";
import { saveUser, updateUser } from "@/app/(main)/backend/pegawai/_action";
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import IconSave from "@/components/icon/icon-save";
import { UserEditSchema, UserSchema } from "@/src/schema/users";
import Jabatan_Type from "@/src/types/jabatan";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Swal, { SweetAlertIcon } from "sweetalert2";
import level from "@/lib/level";

type Inputs = z.infer<typeof UserSchema>;

const FormPegawai = ({ data, mode }: { data?: any; mode?: string }) => {
  const router = useRouter();
  const [detail, setDetail] = useState({
    user_nama: "",
    user_alamat: "",
    user_hp: "",
  });
  const [loading, setLoading] = useState<string>();
  const [jabatan, setJabatan] = useState<Jabatan_Type[]>();
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    // defaultValues: { data },
    resolver: zodResolver(data ? UserEditSchema : UserSchema),
  });
  const [image, setImage] = useState(
    data ? `/api/image/users/${data.user_image}` : "/users/nopic.png"
  );
  const handleChange = (e: any) => {
    const value = e.target.files[0];
    let size = value.size / 1024 / 1024; //dalam mb
    if (size > 2) {
      alert("Ukuran File tidak boleh lebih dari 2Mb");
      return false;
    }
    setImage(URL.createObjectURL(value));
  };

  const getJabatan = async () => {
    const res = await fetch("/api/jabatan");
    const result = await res.json();
    setJabatan(result.data);
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

  useEffect(() => {
    getJabatan();
    if (data) {
      setDetail(data);
      reset(data);
      // setValue('user_id', data.user_id);
      // console.log(data);
    }
  }, []);

  const processForm: SubmitHandler<Inputs> = async (dt) => {
    setLoading("loading");
    const formData = new FormData();
    const postData = JSON.stringify(dt);
    formData.append("postData", postData);
    if (dt.user_image) formData.append("image", dt.user_image[0]);

    const result: any = data
      ? await updateUser(formData, data.user_id)
      : await saveUser(formData);
    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      console.log("error server", result);
      setLoading(undefined);
      // toast.error(String(result.error), { progressStyle: { background: '#ed8176' }, className: 'opacity-70 w-50' });
      return;
    }
    setLoading(undefined);
    if (mode === "profile") showAlert();
    else router.push("/pegawai");
  };

  const onFormError: SubmitErrorHandler<any> = (e) => {
    console.log("There is error here!", e);
    setLoading(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit(processForm, onFormError)}
      className="flex flex-col gap-2.5 xl:flex-row"
    >
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="flex flex-wrap justify-between px-4">
          <div className="mb-6 w-full lg:w-1/2">
            <div className="flex shrink-0 items-center text-black dark:text-white">
              <Image
                src={image}
                alt="img"
                className="w-32"
                width={300}
                height={300}
              />
            </div>
            <div className="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
              <div>{detail.user_nama}</div>
              <div>{detail.user_alamat}</div>
              <div>{detail.user_hp}</div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:max-w-fit">
            <div
              className={clsx("flex items-center", {
                "has-error": errors.user_nip,
              })}
            >
              <label htmlFor="number" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                NIP
              </label>
              <input
                type="text"
                {...register("user_nip")}
                className="form-input w-2/3 lg:w-[250px]"
                placeholder="8801..."
              />
            </div>
          </div>
        </div>
        <div
          className={clsx("mt-4 flex items-center", {
            "has-error": errors.user_jabatan,
          })}
        >
          <label htmlFor="startDate" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
            Jabatan
          </label>
          {jabatan && (
            <select
              {...register("user_jabatan")}
              className="form-select w-2/3 lg:w-[250px]"
            >
              <option value="">Pilih Jabatan</option>
              {jabatan?.map((i) => (
                <option key={i.jabatan_id} value={i.jabatan_id}>
                  {i.jabatan_nama}
                </option>
              ))}
            </select>
          )}
        </div>
        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Data Utama</div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_nama,
                })}
              >
                <label
                  htmlFor="reciever-name1"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Nama Lengkap
                </label>
                <input
                  value={detail.user_nama}
                  id="reciever-name1"
                  type="text"
                  className="form-input flex-1"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setValue("user_nama", e.target.value);
                    setDetail({ ...detail, user_nama: e.target.value });
                  }}
                />
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_email,
                })}
              >
                <label
                  htmlFor="reciever-email1"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Email
                </label>
                <input
                  id="reciever-email1"
                  type="email"
                  {...register("user_email")}
                  className="form-input flex-1"
                  placeholder="Enter Email"
                />
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_alamat,
                })}
              >
                <label
                  htmlFor="reciever-address1"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Alamat
                </label>
                <input
                  value={detail.user_alamat}
                  type="text"
                  className="form-input flex-1"
                  placeholder="Enter Address"
                  onChange={(e) => {
                    setValue("user_alamat", e.target.value);
                    setDetail({ ...detail, user_alamat: e.target.value });
                  }}
                />
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_hp,
                })}
              >
                <label
                  htmlFor="reciever-number"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  No HP
                </label>
                <input
                  value={detail.user_hp}
                  type="text"
                  className="form-input flex-1"
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    setValue("user_hp", e.target.value);
                    setDetail({ ...detail, user_hp: e.target.value });
                  }}
                />
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_image,
                })}
              >
                <label
                  htmlFor="ctnFile"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Photo
                </label>
                <input
                  id="ctnFile"
                  type="file"
                  className="form-input flex-1 p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                  onChange={(e) => {
                    handleChange(e);
                    setValue("user_image", e.target.files);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Data Login</div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_name,
                })}
              >
                <label
                  htmlFor="reciever-name"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Username
                </label>
                <input
                  id="reciever-name"
                  type="text"
                  {...register("user_name")}
                  className="form-input flex-1"
                  placeholder="Enter Name"
                />
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_pass,
                })}
              >
                <label
                  htmlFor="password"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("user_pass")}
                  className="form-input flex-1"
                  placeholder="Enter Password"
                />
              </div>
              {/* <div className={clsx('mt-4 flex items-center', { 'has-error': errors.user_active })}>
                                <label htmlFor="reciever-number" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Aktif
                                </label>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" {...register('user_active')} />
                                    <span className=" text-white-dark">Ya</span>
                                </label>
                            </div> */}
            </div>
            <div className="w-full lg:w-1/2">
              <div className="text-lg">&nbsp;</div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.user_level,
                  hidden: mode === "profile",
                })}
              >
                <label htmlFor="level" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                  Level
                </label>
                <select
                  id="level"
                  {...register("user_level")}
                  className="form-select flex-1"
                >
                  {level
                    .filter((a) => a.id > 1)
                    .map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.text}
                      </option>
                    ))}
                </select>
              </div>
              <div
                className={clsx("mt-4 flex items-center", {
                  "has-error": errors.confirm_password,
                })}
              >
                <label
                  htmlFor="confirm_password"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  {...register("confirm_password")}
                  className="form-input flex-1"
                  placeholder="confirm password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full xl:mt-0 xl:w-96">
        {/* <div className="panel mb-5">
                    <div className={clsx('mt-4', { 'has-error': errors.bank })}>
                        <label htmlFor="currency">Data Rekening</label>
                        <select {...register('bank')} className="form-select">
                            {bank.map((i) => (
                                <option key={i.id} value={i.id}>
                                    {i.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={clsx('mt-4', { 'has-error': errors.nama_rekening })}>
                        <label htmlFor="shipping-charge">Acc. Name </label>
                        <input id="shipping-charge" type="text" {...register('nama_rekening')} className="form-input" placeholder="Nama Pemilik Rekening" />
                    </div>
                    <div className={clsx('mt-4', { 'has-error': errors.nomor_rekening })}>
                        <label htmlFor="payment-method">Nomor Rekening</label>
                        <input type="text" {...register('nomor_rekening')} className="form-input" placeholder="620..." />
                    </div>
                </div> */}
        <div className="panel">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
            <button
              type="submit"
              className="btn btn-success w-full gap-2"
              disabled={typeof loading === "string"}
            >
              {loading ? (
                <>
                  <span className="inline-block h-3 w-3 animate-ping rounded-full bg-white ltr:mr-4 rtl:ml-4"></span>{" "}
                  Loading ...
                </>
              ) : (
                <>
                  <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
                  Simpan
                </>
              )}
            </button>

            <Link href={"/pegawai"} className="btn-dark btn w-full gap-2">
              <IconArrowBackward className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormPegawai;
