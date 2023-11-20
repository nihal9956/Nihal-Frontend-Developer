import React from 'react';

function Banner() {
    return (
        <div className='relative flex flex-col sm:flex-row mb-10'>
            <span className="absolute text-white opacity-80 mt-5 mx-5 sm:mx-10 z-20 font-customOne text-2xl sm:text-4xl font-bold">SpaceAge</span>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="absolute mt-16 md:hidden lg:hidden xl:hidden">
                <h1 className='text-white opacity-90 mt-0 z-20 font-customTwo sm:text-xl font-bold uppercase mx-5 sm:mx-10 '>NextGen <br /> Space organization</h1>
                <button className="z-20 mx-5  sm:w-[30%] bg-blue-500 text-white font-normal text-sm px-5 py-1 mt-2 border border-blue-500 hover:border-transparent rounded"> Learn More</button>
            </div>
            <div className='absolute xl:flex lg:block md:block md:mt-30 lg:mt-30 xl:mt-10 hidden sm:block h-screen flex items-start justify-center flex-col'>
                <h1 className='text-white opacity-90 mt-0 z-20 font-customTwo text-2xl sm:text-4xl font-bold uppercase mx-5 sm:mx-10 leading-relaxed'>NextGen <br /> Space organization</h1>
                <button className="z-20 mx-5 sm:mx-10 mt-5 sm:mt-10 w-full sm:w-[30%] mb-0 bg-blue-500 text-white font-semibold text-lg py-2 px-4 border border-blue-500 hover:border-transparent rounded"> Learn More</button>
            </div>
            <img className="w-full h-auto sm:order-1" src="https://sxcontent9668.azureedge.us/cms-assets/assets/Trans_9_7747_SW_Hill_Horiz_Desktop_75241caad0.jpg" alt="banner-image" />
        </div>
    );
}

export default Banner;
