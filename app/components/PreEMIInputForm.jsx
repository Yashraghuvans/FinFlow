import React, { useState } from 'react';

const PreEMIInputForm = () => {
    const locations = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    const projects = [
        "Tata Eureka Park (multiple phases)",
        "M3M The Cullinan",
        "Eldeco Live By The Greens",
        "Godrej Tropical Isle",
        "ATS Le Grandiose",
        "ATS Picturesque Reprieves",
        "Lodha Fiorenza",
        "Lodha New Cuffe Parade",
        "Lodha Venezia",
        "Lodha Park",
        "Lodha Evoq",
        "Oberoi Realty (multiple large-scale projects)",
        "Prestige Waterford",
        "Prestige Silver Oak",
        "Prestige Jindal City",
        "Prestige Park Square",
        "Prestige Finsbury Park",
        "Embassy Habitat",
        "My Home Hub",
        "My Home 99",
        "My Home Raka",
        "My Home Sayuk",
        "My Home Tridasa",
        "DLF Garden City",
    ];

    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [projectValue, setprojectValue] = useState("");
    const [name, setname] = useState("");
    const [projectTimePeriod, setprojectTimePeriod] = useState("");

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        console.log("Form submitted:", {
            name,
            selectedProject,
            selectedLocation,
            projectValue,
            projectTimePeriod
        });


        setname("");
        setSelectedProject("");
        setSelectedLocation("");
        setprojectValue("");
        setprojectTimePeriod("");
    };


    return (
        <div className="container mx-auto p-4 bg-gray-900 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className='text-2xl font-bold border-b-2 border-white my-5 py-1 text-center text-white'>Enter The Details </h2>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        id="name"
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="project">
                        Project
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        id="project"
                        value={selectedProject}
                        onChange={handleProjectChange}
                    >
                        <option value="" disabled>Select Project</option>
                        {projects.map((project, index) => (
                            <option key={index} value={project}>
                                {project}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        id="location"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                    >
                        <option value="" disabled>Select Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="projectValue">
                        Project Value
                    </label>
                    <input
                        type='number'
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        id='projectValue'
                        placeholder='Amount'
                        value={projectValue}
                        onChange={(e) => setprojectValue(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="projectTimePeriod">
                        Project Time Period (Months)
                    </label>
                    <input
                        type='number'
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        id='projectTimePeriod'
                        placeholder='Time Period (Months)'
                        value={projectTimePeriod}
                        onChange={(e) => setprojectTimePeriod(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PreEMIInputForm;