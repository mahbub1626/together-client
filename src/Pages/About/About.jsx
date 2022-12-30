import React from 'react';

const About = () => {
    return (
        // < !--component -- >
        <div
            className="h-full flex flex-col bg-gray-100 dark:bg-cyan-600 shadow-xl overflow-y-scroll">
            <div className="ml-3 h-7 flex justify-end items-center">
                <button type="button"
                    className="bg-gray-100 dark:bg-cyan-600 m-1 p-3 justify-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                    <span className="sr-only">Close panel</span>
                    {/* <!-- Heroicon name: outline/x --> */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="bg-cyan-300 shadow-lg pb-3 rounded-b-3xl">
                <div
                    className="flex  rounded-b-3xl bg-gray-100 dark:bg-cyan-600 space-y-5 flex-col items-center py-7">
                    <img className="h-28 w-28 rounded-full"
                        src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                        alt="User" />
                        <a href="#"> <span
                            className="text-h1">Michele</span></a>
                </div>
                <div
                    className="grid px-7 py-2  items-center justify-around grid-cols-3 gap-4 divide-x divide-solid ">
                    <div className="col-span-1 flex flex-col items-center ">
                        <span className="text-2xl font-bold dark:text-gray-500">127</span>
                        <span className="text-lg font-medium 0">Following</span>
                    </div>
                    <div className="col-span-1 px-3 flex flex-col items-center ">
                        <span className="text-2xl font-bold dark:text-gray-500">
                            2.9k</span>
                        <span className="text-lg font-medium">Followers</span>
                    </div>
                    <div className="col-span-1 px-3 flex flex-col items-center ">
                        <span className="text-2xl font-bold dark:text-gray-500">
                            93</span>
                        <span className="text-lg font-medium">Posts</span>
                    </div>
                </div>

            </div>

            <div className="flex mx-auto mt-3 w-100 ">
                <a href="/"> <button
                    className="p-2 shadow-lg rounded-2xl tr-300 w-100 font-medium  bg-cyan-500 rounded-md hover:bg-cyan-600 text-gray-50">
                        News Feed</button></a>
            </div>
        </div>
    );
};

export default About;