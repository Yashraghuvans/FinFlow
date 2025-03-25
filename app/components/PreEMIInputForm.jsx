import React, { useState } from 'react';

const PreEMIInputForm = ({ onSubmit }) => {
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
    const [plannedBudget, setPlannedBudget] = useState('');
    const [actualSpending, setActualSpending] = useState('');
    const [revenue, setRevenue] = useState('');
    const [expenses, setExpenses] = useState('');

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            selectedProject,
            selectedLocation,
            projectValue,
            projectTimePeriod,
            plannedBudget,
            actualSpending,
            revenue,
            expenses
        };

        console.log("Form submitted:", formData);

        onSubmit(formData);

        setname("");
        setSelectedProject("");
        setSelectedLocation("");
        setprojectValue("");
        setprojectTimePeriod("");
        setPlannedBudget('');
        setActualSpending('');
        setRevenue('');
        setExpenses('');
    };

    return (
        <div className="w-full p-4 bg-gray-900 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full bg-gray-800 shadow-md rounded px-8 pt-6 pb-8">
                <h2 className='text-2xl font-bold border-b-2 border-white my-5 py-1 text-center text-white'>Enter The Details</h2>
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="projectValue" className="block text-sm font-medium text-white">
                            Project Value
                        </label>
                        <input
                            type="number"
                            id="projectValue"
                            name="projectValue"
                            value={projectValue}
                            onChange={(e) => setprojectValue(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="projectTimePeriod" className="block text-sm font-medium text-white">
                            Project Time Period
                        </label>
                        <input
                            type="number"
                            id="projectTimePeriod"
                            name="projectTimePeriod"
                            value={projectTimePeriod}
                            onChange={(e) => setprojectTimePeriod(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="plannedBudget" className="block text-sm font-medium text-white">
                            Planned Budget
                        </label>
                        <input
                            type="number"
                            id="plannedBudget"
                            name="plannedBudget"
                            value={plannedBudget}
                            onChange={(e) => setPlannedBudget(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="actualSpending" className="block text-sm font-medium text-white">
                            Actual Spending
                        </label>
                        <input
                            type="number"
                            id="actualSpending"
                            name="actualSpending"
                            value={actualSpending}
                            onChange={(e) => setActualSpending(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="revenue" className="block text-sm font-medium text-white">
                            Revenue
                        </label>
                        <input
                            type="number"
                            id="revenue"
                            name="revenue"
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="expenses" className="block text-sm font-medium text-white">
                            Expenses
                        </label>
                        <input
                            type="number"
                            id="expenses"
                            name="expenses"
                            value={expenses}
                            onChange={(e) => setExpenses(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
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