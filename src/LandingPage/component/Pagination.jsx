import React, { useEffect, useState } from 'react'

function Pagination(props) {
    const { totalRecords, onPageChange, searchReturnDataCount, noResult } = props;
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
    };
    useEffect(() => {
        if (searchReturnDataCount > 0) {
            setTotalPage(Math.ceil(searchReturnDataCount / 10));
        } else {
            setTotalPage(Math.ceil(totalRecords / 10));
        }
    }, [totalRecords, searchReturnDataCount]);

    return (
        <div className='mx-10 mb-10'>
            {!noResult && <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    {[...Array(totalPage).keys()].map((page) => (
                        <li
                            key={page + 1}
                            className={`pagination-item cursor-pointer ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                                }`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            <a className=" flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">  {page + 1}</a>

                        </li>
                    ))}
                </ul>
            </nav>}
        </div>
    )
}

export default Pagination