import React, { useState } from 'react';
import Card from './Card';
import makeApiRequest from '../../DataRequest';

function SearchForm() {
    const [searchFormValues, setSearchFormValues] = useState({
        status: '',
        launch: '',
        type: ''
    });
    const [searchedData, setSearchedData] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const [searchResultTotalCount, setSearchResultTotalCount] = useState(0);
    const isValidDate = (dateString) => {
        const dateObject = new Date(dateString);
        return !isNaN(dateObject.getTime()) && dateObject.toString() !== 'Invalid Date';
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isValidDate(new Date(value))) {
            setSearchFormValues({ ...searchFormValues, [name]: value });
        } else {
            setSearchFormValues({ ...searchFormValues, [name]: value });
        }
    };

    const getSpaceXData = () => {
        let searchUrl = ''
        if (searchFormValues.status === 'all') {
            let dateToSearch = ''
            if (searchFormValues.launch) {
                dateToSearch = new Date(searchFormValues.launch).toISOString();
            }
            searchUrl = `https://api.spacexdata.com/v3/capsules?type=${searchFormValues.type}&original_launch=${dateToSearch}`;
        } else {
            let dateToSearch = ''
            if (searchFormValues.launch) {
                dateToSearch = new Date(searchFormValues.launch).toISOString();
            }
            searchUrl = `https://api.spacexdata.com/v3/capsules?status=${searchFormValues.status}&type=${searchFormValues.type}&original_launch=${dateToSearch}`
        }
        makeApiRequest('get', searchUrl)
            .then((data) => {
                if (data.length > 0) {
                    setSearchResultTotalCount(data.length);
                    setSearchedData(data.splice(0, 10));
                    setNoResult(false);
                } else {
                    setSearchedData([]);
                    setNoResult(true);
                }
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
            });
    };

    const handleSearch = () => {
        getSpaceXData();
    };
    return (
        <>
            <span className='text-black font-bold text-3xl uppercase mx-10'>Search Capsules</span>
            <div className='w-60 mx-10 bg-blue-500 h-1 mt-2'></div>
            <div className="grid gap-4 mb-6 md:grid-cols-4 mx-10 mt-10 flex items-center">
                <div>
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Status
                    </label>
                    <select
                        name="status"
                        value={searchFormValues.status}
                        onChange={(e) => handleInputChange(e)}
                        id="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected value="all">All</option>
                        <option value="active">Active</option>
                        <option value="retired">Retired</option>
                        <option value="destroyed">Destroyed</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="launch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Original Launch
                    </label>
                    <input
                        type="datetime-local"
                        value={searchFormValues.launch}
                        onChange={(e) => handleInputChange(e)}
                        id="launch"
                        name="launch"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Type
                    </label>
                    <input
                        name="type"
                        value={searchFormValues.type}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        id="type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Type"
                        required
                    />
                </div>

                <div>
                    <button
                        onClick={handleSearch}
                        className="z-20 mx-10 mt-5 w-[70%] mb-0 bg-blue-500 text-white font-semibold text-lg py-1.5 px-4 border border-blue-500 hover:border-transparent rounded flex items-center justify-center cursor-pointer"
                    >
                        <img className='w-5 h-5 mr-2' src='assets/icons/search-interface-symbol.png' alt="search-icon" /> Search
                    </button>
                </div>
            </div>
            <Card searchedData={searchedData} searchFormValues={searchFormValues} searchResultTotalCount={searchResultTotalCount} noResult={noResult} />
        </>
    );
}

export default SearchForm;
