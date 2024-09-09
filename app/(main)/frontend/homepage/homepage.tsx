"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { initFlowbite } from "flowbite";
import Link from "next/link";

export const metadata = {
  title: "Homepage",
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Homepage = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("../../../api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Email terkirim: " + data.message);
      } else {
        alert("Gagal mengirim email: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container-fluid">
      <nav className="absolute left-0 right-0 top-0 z-50 bg-transparent dark:bg-transparent">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/assets/images/logokukar.png"
              className="h-16"
              alt="Logo kukar"
            />
            <span className="self-center whitespace-nowrap text-2xl font-extrabold text-white">
              Kerta Buana
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-8 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden md:h-10 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto "
            id="navbar-default"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-white p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse ">
              <li>
                <a
                  href="#home"
                  className="block rounded px-3 py-2  text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:text-lg md:text-white md:hover:bg-transparent md:hover:text-green-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#pengumuman"
                  className="block rounded px-3 py-2  text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:text-lg md:text-white md:hover:bg-transparent md:hover:text-green-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Pengumuman
                </a>
              </li>
              <li>
                <a
                  href="#profil"
                  className="block rounded px-3 py-2  text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:text-lg md:text-white md:hover:bg-transparent md:hover:text-green-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Profil
                </a>
              </li>

              <li>
                <a
                  href="#kontak"
                  className="block rounded px-3 py-2  text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:text-lg md:text-white md:hover:bg-transparent md:hover:text-green-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Kontak
                </a>
              </li>
              <li>
                <Link
                  href="/backend"
                  className="block rounded px-3 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:text-lg md:text-white md:hover:bg-transparent md:hover:text-green-600 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section
        className="h-auto content-center bg-gray-700 bg-[url('/assets/images/sawah.jpg')] bg-cover bg-no-repeat bg-blend-multiply lg:h-screen"
        id="home"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-24 text-center md:items-center ">
          <img
            src="/assets/images/logokukar.png"
            alt="logo kukar"
            className="mx-auto h-24 pb-3 md:h-40"
          />
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-white md:text-3xl lg:text-4xl">
            SISTEM INFORMASI DESA KERTA BUANA
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
            Kec. Tenggarong Seberang Kab. Kukar
          </p>

          <div className="container mx-auto">
            {/* Desktop version */}
            <div className="hidden place-items-center justify-center gap-4 md:grid md:grid-cols-4 lg:grid lg:grid-cols-8">
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/ktp.svg"
                    className="w-14 hover:scale-110"
                    alt="ktp"
                  />
                  <p className="text-xs font-bold">Surat Pengantar KTP</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/smiley.svg"
                    className="w-14 hover:scale-110"
                    alt="smiley"
                  />
                  <p className="text-xs font-bold">Surat Berkelakuan Baik</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/menikah.svg"
                    className="w-14 hover:scale-110"
                    alt="menikah"
                  />
                  <p className="text-xs font-bold">Suket. Belum Menikah</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/miskin.svg"
                    className="w-14 hover:scale-110"
                    alt="miskin"
                  />
                  <p className="text-xs font-bold">Suket. Tidak Mampu</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/police.svg"
                    className="w-14 hover:scale-110"
                    alt="police"
                  />
                  <p className="text-xs font-bold">SKCK</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/ktp-beda.svg"
                    className="w-14 hover:scale-110"
                    alt="ktp-beda"
                  />
                  <p className="text-xs font-bold">Suket. KTP Beda Nama</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/uang.svg"
                    className="w-14 hover:scale-110"
                    alt="uang"
                  />
                  <p className="text-xs font-bold">Suket. Ahli Waris</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/al-quran.svg"
                    className="w-14 hover:scale-110"
                    alt="al-quran"
                  />
                  <p className="text-xs font-bold">Suket. Domisili MTQ</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/thief.svg"
                    className="w-14 hover:scale-110"
                    alt="thief"
                  />
                  <p className="text-xs font-bold">Suket. Kehilangan Barang</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/lahir.svg"
                    className="w-14 hover:scale-110"
                    alt="lahir"
                  />
                  <p className="text-xs font-bold">Suket. Kelahiran</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/mati.svg"
                    className="w-14 hover:scale-110"
                    alt="mati"
                  />
                  <p className="text-xs font-bold">Suket. Kematian</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/penghasilan.svg"
                    className="w-14 hover:scale-110"
                    alt="penghasilan"
                  />
                  <p className="text-xs font-bold">
                    Suket. Penghasilan Tidak Tetap
                  </p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/factory.svg"
                    className="w-14 hover:scale-110"
                    alt="factory"
                  />
                  <p className="text-xs font-bold">Suket. Usaha</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/vaksin.svg"
                    className="w-14 hover:scale-110"
                    alt="vaksin"
                  />
                  <p className="text-xs font-bold">Suket. Vaksin Nikah</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/cerai.svg"
                    className="w-14 hover:scale-110"
                    alt="cerai"
                  />
                  <p className="text-xs font-bold">Suket. Pindah Nikah</p>
                </div>
              </div>
              <div className="card h-40 w-full rounded-3xl bg-base-100 shadow-xl hover:shadow-lg hover:shadow-green-500/50">
                <div className="card-body items-center text-center">
                  <img
                    src="/assets/images/tani.svg"
                    className="w-14 hover:scale-110"
                    alt="tani"
                  />
                  <p className="text-xs font-bold">Suket. Kelompok Tani</p>
                </div>
              </div>
            </div>
            {/* Mobile version */}
            <div className="w-full p-4 md:hidden">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="inline-flex items-center rounded-lg bg-green-700 px-28 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                type="button"
              >
                Pilih Surat Keterangan{" "}
                <svg
                  className="ms-3 h-2.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className="z-10 hidden w-96 divide-y divide-gray-100 rounded-lg bg-gray-700 shadow dark:bg-gray-500 "
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Surat Pengantar KTP
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Surat Berkelakuan Baik
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Belum Menikah
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Tidak Mampu
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      SKCK
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. KTP Beda Nama
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Ahli Waris
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Domisili MTQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Kehilangan Barang
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Kelahiran
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Kematian
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Penghasilan Tidak Tetap
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Usaha
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Vaksin Nikah
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Pindah Nikah
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-600"
                    >
                      Suket. Kelompok Tani
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container mx-auto my-10 p-5 md:rounded-md md:bg-white md:p-10 md:shadow-lg"
        id="pengumuman"
      >
        <h1 className="text-center text-2xl font-extrabold leading-none tracking-tight text-black md:mb-10 md:py-5 md:text-3xl lg:text-4xl">
          PENGUMUMAN TERBARU DESA
        </h1>
        <div className="grid grid-cols-1 items-center justify-items-center gap-5 space-y-5 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="card h-48 w-full bg-base-100 shadow-lg shadow-green-500/50 md:h-44 md:w-80 lg:w-72 xl:w-64">
            <div className="card-body items-center">
              <h2 className="card-title mx-auto text-center font-extrabold underline decoration-sky-500">
                17 Agustus
              </h2>
              <p className="text-center">
                Desa akan mengadakan lomba di aula desa Kerta Buana
              </p>
            </div>
          </div>
          <div className="card h-48 w-full bg-base-100 shadow-lg shadow-green-500/50 md:h-44 md:w-80 lg:w-72 xl:w-64">
            <div className="card-body">
              <h2 className="card-title mx-auto text-center font-extrabold underline decoration-sky-500">
                17 Agustus
              </h2>
              <p className="text-center">
                Desa akan mengadakan lomba di aula desa Kerta Buana
              </p>
            </div>
          </div>
          <div className="card h-48 w-full bg-base-100 shadow-lg shadow-green-500/50 md:h-44 md:w-80 lg:w-72 xl:w-64">
            <div className="card-body">
              <h2 className="card-title mx-auto text-center font-extrabold underline decoration-sky-500">
                17 Agustus
              </h2>
              <p className="text-center">
                Desa akan mengadakan lomba di aula desa Kerta Buana
              </p>
            </div>
          </div>
          <div className="card h-48 w-full bg-base-100 shadow-lg shadow-green-500/50 md:h-44 md:w-80 lg:w-72 xl:w-64">
            <div className="card-body">
              <h2 className="card-title mx-auto text-center font-extrabold underline decoration-sky-500">
                17 Agustus
              </h2>
              <p className="text-center">
                Desa akan mengadakan lomba di aula desa Kerta Buana
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mx-auto my-10 md:box-content md:rounded-md md:bg-white md:shadow-lg"
        id="profil"
      >
        <h1 className="text-center text-2xl font-extrabold leading-none tracking-tight text-black md:-mb-5 md:py-10 md:text-3xl lg:text-4xl">
          SAMBUTAN KEPALA DESA
        </h1>
        <div className="mx-auto grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:items-center  ">
          <div className="lg:h-auto lg:w-full">
            <img
              src="assets/images/ketut-basuki.jpg"
              alt="Sambutan Kepala Desa"
              className="mx-auto h-auto w-full rounded-lg md:w-10/12 lg:w-8/12"
            />
          </div>
          <div className="pt-5 md:pr-5 md:pt-0 lg:pr-10">
            <p className="text-justify text-lg font-semibold leading-relaxed md:text-base md:leading-normal lg:text-lg xl:text-xl xl:leading-loose">
              Selamat datang di website resmi Desa Kerta Buana. Sebagai Kepala
              Desa, saya merasa bangga dapat mempersembahkan platform ini
              sebagai sarana informasi dan komunikasi bagi seluruh masyarakat.
              Semoga dengan adanya website ini, kita semua dapat lebih mudah
              mengakses informasi terkini seputar desa, serta mempermudah akses
              masyarakat dalam proses surat menyurat
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10 md:box-content md:rounded-md md:bg-white md:shadow-lg">
        <h1 className="text-center text-2xl font-extrabold leading-none tracking-tight text-black md:-mb-5 md:py-10 md:text-3xl lg:text-4xl">
          SERBA-SERBI DESA
        </h1>
        <div className="mx-auto grid grid-cols-1 gap-6 p-5 md:grid-cols-3 ">
          <div className="pt-5 md:col-span-2 md:pr-5 md:pt-0 lg:pr-10">
            <p className="text-justify text-lg font-semibold leading-relaxed md:mx-auto md:text-base md:leading-normal lg:text-lg xl:text-xl xl:leading-loose">
              Desa Kerta Buana di Kecamatan Tenggarong Seberang dikenal dengan
              kekayaan alam dan budayanya. Dikelilingi lahan pertanian subur,
              desa ini menjadi pusat hasil bumi yang melimpah. Dengan
              pemandangan alam yang indah dan tradisi lokal yang masih terjaga,
              Kerta Buana juga menawarkan potensi wisata pedesaan yang
              menjanjikan. Gotong royong dan kebersamaan menjadi nilai utama
              dalam kehidupan masyarakatnya yang terus berkembang.
            </p>

            <div className="carousel w-full">
              <div id="slide1" className="carousel-item relative w-full ">
                <img
                  src="/assets/images/cr-1.jpg"
                  className="h-96 w-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img
                  src="/assets/images/cr-2.jpeg"
                  className="h-96 w-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img
                  src="/assets/images/cr-3.jpg"
                  className="h-96 w-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img
                  src="/assets/images/cr-4.jpg"
                  className="h-96 w-full object-cover"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide3" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="clip-irregular md:flex md:items-center lg:h-auto lg:w-full ">
            <img
              src="assets/images/bg-desa.svg"
              alt="Sambutan Kepala Desa"
              className=" lg:w-12/12 md:w-12/12 hidden h-auto w-full rounded-lg md:my-auto md:block"
            />
          </div>
        </div>
      </section>

      <section
        className="container mx-auto my-10 py-24 md:box-content md:rounded-md md:bg-white md:shadow-lg"
        id="kontak"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="mb-10 lg:mb-0">
              <div className="group h-full w-full">
                <div className="relative h-full">
                  <img
                    src="assets/images/pns1.jpg"
                    alt="ContactUs tailwind section"
                    className="h-full w-full rounded-2xl bg-green-700 bg-blend-multiply lg:rounded-l-2xl"
                  />
                  <h1 className="font-manrope absolute left-11 top-11 text-4xl font-bold leading-10 text-white">
                    Kontak Kami
                  </h1>
                  <div className="absolute bottom-0 w-full p-5 lg:p-11">
                    <div className="block rounded-lg bg-white p-6">
                      <a href="javascript:;" className="mb-6 flex items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                            stroke="#15803D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div>
                          <h5 className="ml-5 text-base font-normal leading-6 text-black">
                            Bpk. Hari Kurnia Wibawa
                          </h5>
                          <h5 className="ml-5 text-base font-normal leading-6 text-black">
                            0822-5546-2424
                          </h5>
                        </div>
                      </a>
                      <a href="javascript:;" className="mb-6 flex items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                            stroke="#15803D"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <h5 className="ml-5 text-base font-normal leading-6 text-black">
                          desakertabuana24@gmail.com
                        </h5>
                      </a>
                      <a href="javascript:;" className="flex items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                            stroke="#15803D"
                            stroke-width="2"
                          />
                          <path
                            d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                            stroke="#15803D"
                            stroke-width="2"
                          />
                        </svg>
                        <h5 className="ml-5 text-base font-normal leading-6 text-black">
                          Kalimantan Timur, Kab. Kutai Kartanegara, Kec.
                          Tenggarong Seberang, 75572
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 lg:rounded-r-2xl lg:p-11">
              <h2 className="font-manrope mb-11 text-4xl font-semibold leading-10 text-green-600">
                Area Pengaduan
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="mb-10 h-12 w-full rounded-full border border-gray-200 bg-transparent pl-4 text-lg font-normal leading-7 text-gray-600 placeholder-gray-400 shadow-sm focus:outline-none"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  className="mb-10 h-12 w-full rounded-full border border-gray-200 bg-transparent pl-4 text-lg font-normal leading-7 text-gray-600 placeholder-gray-400 shadow-sm focus:outline-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  className="mb-10 h-12 w-full rounded-full border border-gray-200 bg-transparent pl-4 text-lg font-normal leading-7 text-gray-600 placeholder-gray-400 shadow-sm focus:outline-none"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <textarea
                  id="message"
                  name="message"
                  className="mb-10 w-full rounded-3xl border border-gray-200 bg-transparent pl-4 text-lg font-normal leading-7 text-gray-600 placeholder-gray-400 shadow-sm focus:outline-none"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button
                  type="submit"
                  className="h-12 w-full rounded-full bg-green-600 text-base font-semibold leading-6 text-white shadow-sm transition-all duration-700 hover:bg-green-800"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer bg-base-200 p-10 text-base-content">
        <aside>
          <img
            src="/assets/images/kolab.png"
            className="h-16 fill-current"
            alt="Logo kukar"
          />
          <p>
            Desa Kerta Buana
            <br />
            Kab. Kukar Kec. Loa Janan
            <br />
            Pembuatan website bekerja sama dengan{" "}
            <a
              href="https://www.umkt.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold"
            >
              UMKT
            </a>
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Hubungi Kami</h6>
          <p className="text-base">
            Kalimantan Timur, Kab. Kutai Kartanegara, Kec. Tenggarong Seberang,
            75572
          </p>
          <a className="link-hover link">Telepon : 0822-5546-2424 </a>
          <a className="link-hover link">Email : desakertabuana24@gmail.com</a>
          <div className="flex space-x-5">
            <a href="https://www.facebook.com/kerta.buana.94">
              <img src="/assets/images/fb.svg" className="w-10" alt="" />
            </a>
            <a href="https://www.instagram.com/kertabuana?igsh=MW4xZzcxN3ZxYzU3Zg==">
              <img src="/assets/images/ig.png" className="w-10" alt="" />
            </a>
            <a href="https://youtu.be/nOFqH1dfZCw?si=rnIMyB0wNoUaqubs">
              <img src="/assets/images/yt.svg" className="w-10" alt="" />
            </a>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Layanan Terkait</h6>
          <a href="#home" className="link-hover link">
            Pembuatan Surat
          </a>
          <a href="#kontak" className="link-hover link">
            Area Pengaduan
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Homepage;
