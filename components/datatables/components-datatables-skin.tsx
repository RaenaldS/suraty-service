'use client';
import Tippy from '@tippyjs/react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import IconPencil from '../icon/icon-pencil';
import IconTrashLines from '../icon/icon-trash-lines';
import IconDownload from '../icon/icon-download';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

const rowData = [
    {
        id: 1,
        firstName: 'Januari ',
        lastName: '41 Org',
        email: '224 Jt',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Februari',
        lastName: '41 Org',
        email: '37 Jt',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Maret',
        lastName: '39 Org',
        email: '230 Jt',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'April',
        lastName: '40 Org',
        email: '67 Jt',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Mei',
        lastName: '41 Org',
        email: ' 89 Jt',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+1 (962) 466-3483',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },
    {
        id: 6,
        firstName: 'Juni',
        lastName: '39 Org',
        email: '90 Jt',
        dob: '2011-05-29',
        address: {
            street: '131 Guernsey Street',
            city: 'Vallonia',
            zipcode: 6779,
            geo: {
                lat: -2.681655,
                lng: 3.528942,
            },
        },
        phone: '+1 (884) 595-2643',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
    },
    {
        id: 7,
        firstName: 'Juli',
        lastName: '41 Org',
        email: ' 103 Jt',
        dob: '2010-11-23',
        address: {
            street: '668 Lenox Road',
            city: 'Lowgap',
            zipcode: 992,
            geo: {
                lat: 36.026423,
                lng: 130.412198,
            },
        },
        phone: '+1 (906) 474-3155',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
    },
    {
        id: 8,
        firstName: 'Agustus',
        lastName: '40 Org',
        email: '120 Jt',
        dob: '1987-07-02',
        address: {
            street: '773 Harrison Avenue',
            city: 'Carlton',
            zipcode: 5909,
            geo: {
                lat: 42.464724,
                lng: -12.948403,
            },
        },
        phone: '+1 (930) 546-2952',
        isActive: true,
        age: 24,
        company: 'AVIT',
    },
    {
        id: 9,
        firstName: 'September',
        lastName: '41 Org',
        email: '132 Jt',
        dob: '2010-11-02',
        address: {
            street: '200 Malta Street',
            city: 'Tuskahoma',
            zipcode: 1292,
            geo: {
                lat: -52.206169,
                lng: 74.19452,
            },
        },
        phone: '+1 (927) 566-3600',
        isActive: false,
        age: 28,
        company: 'QUILCH',
    },
];

const ComponentsDatatablesSkin = () => {
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const tahun_now = new Date().getFullYear();
    const tahun_list = Array.from({ length: 10 }, (value, index) => tahun_now - index);

    //Skin: Hover
    const [page1, setPage1] = useState(1);
    const [pageSize1, setPageSize1] = useState(PAGE_SIZES[0]);
    const [initialRecords1, setInitialRecords1] = useState(rowData);
    const [recordsData1, setRecordsData1] = useState(initialRecords1);

    const [search1, setSearch1] = useState('');

    useEffect(() => {
        setPage1(1);
    }, [pageSize1]);

    useEffect(() => {
        const from = (page1 - 1) * pageSize1;
        const to = from + pageSize1;
        setRecordsData1([...initialRecords1.slice(from, to)]);
    }, [page1, pageSize1, initialRecords1]);

    useEffect(() => {
        setInitialRecords1(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search1.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search1.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(search1.toLowerCase()) ||
                    item.email.toLowerCase().includes(search1.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search1.toLowerCase())
                );
            });
        });
    }, [search1]);

    return (
        <div className="panel">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Laporan Gaji Per Bulan</h5>
                <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="dropdown">
                            <select className="form-select lg:w-[100px]">
                                {tahun_list.map((e) => (
                                    <option value={e} key={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search1} onChange={(e) => setSearch1(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={recordsData1}
                    columns={[
                        { accessor: 'id', title: 'ID' },
                        { accessor: 'firstName', title: 'Bulan' },
                        { accessor: 'lastName', title: 'Jumlah Personil' },
                        { accessor: 'email', title: 'Total' },
                        {
                            accessor: 'phone',
                            title: 'Action',
                            render: ({ age }) => (
                                <div className="mx-auto flex w-max items-center gap-2">
                                    <IconDownload />
                                    <span onClick={() => console.log(age)} className="cursor-pointer">
                                        <IconPencil className="text-primary" />
                                    </span>
                                    <IconTrashLines className="text-danger" />
                                </div>
                            ),
                        },
                    ]}
                    totalRecords={initialRecords1.length}
                    recordsPerPage={pageSize1}
                    page={page1}
                    onPageChange={(p) => setPage1(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize1}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default ComponentsDatatablesSkin;
