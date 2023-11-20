import React, { useEffect, useState } from 'react'
import makeApiRequest from '../../DataRequest.js';
import Pagination from './Pagination.jsx';
import Modal from './Modal.jsx';

function Card({ searchedData, searchResultTotalCount, searchFormValues, noResult }) {
    const [totalRecords, setTotalRecords] = useState(0);
    const [capsulesData, setCapsulesData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (capsuleData) => {
        setModalData(capsuleData);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const getSpaceXData = (startIndex, endIndex) => {
        let searchUrl = ''
        if (searchFormValues.status === 'all' || searchFormValues.status === '') {
            searchUrl = `https://api.spacexdata.com/v3/capsules`
        } else {
            let dateToSearch = ''
            if (searchFormValues.launch) {
                dateToSearch = new Date(searchFormValues.launch).toISOString();
            }
            searchUrl = `https://api.spacexdata.com/v3/capsules?status=${searchFormValues.status}&type=${searchFormValues.type}&original_launch=${dateToSearch}`
        }
        makeApiRequest('get', searchUrl)
            .then((data) => {
                setTotalRecords(data.length);
                setCapsulesData(data.splice(startIndex, endIndex));
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getSpaceXData(0, 10);
    }, []);

    useEffect(() => {
        if (searchedData) {
            setCapsulesData(searchedData);
        }
    }, [searchedData]);

    const renderStatusBadge = (status) => {

        if (status === 'active') {
            return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 capitalize rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{status}</span>
        } else if (status === 'unknown') {
            return <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 capitalize rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{status}</span>
        } else if (status === 'destroyed') {
            return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 capitalize rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{status}</span>
        } else {
            return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 capitalize py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">{status}</span>
        }

    }

    const convertToLocalDateAndTime = (utcTime) => {
        const utcDate = new Date(utcTime);

        // Get local date and time
        const day = utcDate.getUTCDate();
        const month = utcDate.getUTCMonth() + 1;
        const year = utcDate.getUTCFullYear() % 100;

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedYear = year < 10 ? `0${year}` : year;
        const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;

        const localTime = utcDate.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        return `${formattedDate}  ${localTime}`;

    }

    const onPageChange = (pageNo) => {
        getSpaceXData(((pageNo - 1) * 10), (pageNo * 10));
    }

    return (
        <>
            {noResult && <h1 className='font-bold text-4xl text-center mt-10'>No Result Found.</h1>}
            <div className="grid gap-4 mx-10 mt-14 mb-6 md:grid-cols-4">
                <Modal isOpen={isModalOpen}>
                    <div className='relative'>
                        <img onClick={closeModal} className='w-3 h-3 mr-2 absolute top-0 right-0 cursor-pointer' src='assets/icons/close.png' alt="search-icon" />
                        <h1 className="text-2xl font-bold mb-4 pt-7">Capsule Type : {modalData.type}</h1>
                        <p className='font-bold inline'>Capsule ID: </p><span>{modalData.capsule_id}</span>
                        <br />
                        <p className='font-bold inline'>Capsule Serial No: </p><span>{modalData.capsule_serial}</span>
                        <p className='text-center font-bold text-md'>Missions</p>
                        <hr className='mt-2 mb-2' />
                        {modalData.missions?.length > 0 && modalData.missions.map((mission) => {
                            return (
                                <>
                                    <span className='font-bold'>Mission Name:</span> <span> {mission.name}</span>
                                    <br />
                                    <span className='font-bold'>No Of Flights: </span><span>{mission.flight}</span>
                                    <br />
                                </>
                            )
                        })}
                        <hr className='mt-2 mb-2' />
                        <div className='mt-5'><span className='font-bold'>Status: </span>{renderStatusBadge(modalData.status)}</div>
                    </div>
                </Modal>
                {capsulesData.map((capsule) => {
                    return (
                        <div onClick={() => openModal(capsule)} key={capsule.capsule_serial} className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{capsule.type}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{capsule.details ? capsule.details : '-'}</p>
                                <p><span className='font-bold text-sm'>Launch Time :</span> {convertToLocalDateAndTime(capsule.original_launch) || '-'}</p>
                                <div className='mt-5'>{renderStatusBadge(capsule.status)}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination searchReturnDataCount={searchResultTotalCount} totalRecords={totalRecords} onPageChange={onPageChange} noResult={noResult} />
        </>
    )
}

export default Card