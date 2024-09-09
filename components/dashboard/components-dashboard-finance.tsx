'use client';
// import Dropdown from '@/components/dropdown';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import IconEye from '@/components/icon/icon-eye';
// import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import { formatNumber } from '@/lib/format_number';
// import { IRootState } from '@/store';
import dayjs from 'dayjs';
import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

const ComponentsDashboard = ({
    datagaji,
    pegawai,
    dewan,
    tunjangan,
    gaji,
    tp,
}: {
    datagaji: { terendah: number; tertinggi: number; avg: number; created: string };
    gaji: string;
    pegawai: number;
    dewan: number;
    tunjangan: { _count: { tp_id: number }; tp_jenis: number }[];
    tp: { tunjangan: number; potongan: number };
}) => {
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const gaji1 = JSON.parse(gaji);
    // console.log(gaji1);
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/dashboard" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Jumlah Pegawai</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {pegawai} </div>
                            <div className="badge bg-white/30">{((pegawai / (dewan + pegawai)) * 100).toFixed()}% </div>
                        </div>
                        <Link href={`/pegawai/jabatan/1`} className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Lihat Data
                        </Link>
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">DPRD</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {dewan} </div>
                            <div className="badge bg-white/30">{((dewan / (dewan + pegawai)) * 100).toFixed()}% </div>
                        </div>
                        <Link href={`/pegawai/jabatan/2`} className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Lihat Data
                        </Link>
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Jenis Tunjangan</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {tunjangan.find((a) => a.tp_jenis === 1)?._count.tp_id} </div>
                            <div className="badge">&nbsp;</div>
                        </div>
                        <Link href="/tunjangan" className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Lihat Data
                        </Link>
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Jenis Potongan</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {tunjangan.find((a) => a.tp_jenis === 2)?._count.tp_id} </div>
                            <div className="badge">&nbsp; </div>
                        </div>
                        <Link href="/potongan" className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Lihat Data
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="grid gap-6 xl:grid-flow-row">
                        {/*  Previous Statement  */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Data Gaji</div>
                                    <div className="text-success"> Terakhir Dibayar {dayjs(datagaji.created).format('DD MMMM YYYY')} </div>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                                    <IconCircleCheck className="h-full w-full text-success opacity-20" />
                                </div>
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                    <div>
                                        <div className="text-primary">Tertinggi</div>
                                        <div className="mt-2 text-2xl font-semibold">{formatNumber(datagaji.tertinggi)}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Terendah</div>
                                        <div className="mt-2 text-2xl font-semibold">{formatNumber(datagaji.terendah)}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Rata-rata</div>
                                        <div className="mt-2 text-2xl font-semibold">{formatNumber(+datagaji.avg.toFixed())}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Current Statement */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Tunjangan & Potongan</div>
                                    <div className="text-danger"> Rekap Bulan terakhir </div>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                                    <IconInfoCircle className="h-full w-24 text-danger opacity-20" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-primary">Total Tunjangan</div>
                                        <div className="mt-2 text-2xl font-semibold">{formatNumber(tp.tunjangan)}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Total Potongan</div>
                                        <div className="mt-2 text-2xl font-semibold">{formatNumber(tp.potongan)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Recent Transactions  */}
                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Penerimaan Tertinggi</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>NAMA</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gaji1?.slice(0, 6).map((a: any, idx: number) => {
                                        return (
                                            <tr key={a.gajian_pegawai}>
                                                <td className="font-semibold">#{idx + 1}</td>
                                                <td className="whitespace-nowrap">{a.user_nama}</td>
                                                <td className="text-right">{formatNumber(a.nominal)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentsDashboard;
