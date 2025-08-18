import React, { useState } from 'react';
import { Building2, MapPin, Calendar, DollarSign, TrendingUp, Calculator, Save } from 'lucide-react';

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
        setPlannedBudget("");
        setActualSpending("");
        setRevenue("");
        setExpenses("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Information Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                    <Building2 className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Project Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Project Name
                        </label>
                        <select
                            value={selectedProject}
                            onChange={handleProjectChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a project</option>
                            {projects.map((project, index) => (
                                <option key={index} value={project}>
                                    {project}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Location
                        </label>
                        <select
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select location</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Project Value (₹)
                        </label>
                        <input
                            type="number"
                            value={projectValue}
                            onChange={(e) => setprojectValue(e.target.value)}
                            className="form-input"
                            placeholder="Enter project value"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Project Time Period (months)
                        </label>
                        <input
                            type="number"
                            value={projectTimePeriod}
                            onChange={(e) => setprojectTimePeriod(e.target.value)}
                            className="form-input"
                            placeholder="Enter time period"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Financial Information Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="w-5 h-5 text-success-400" />
                    <h3 className="text-lg font-semibold text-white">Financial Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Planned Budget (₹)
                        </label>
                        <input
                            type="number"
                            value={plannedBudget}
                            onChange={(e) => setPlannedBudget(e.target.value)}
                            className="form-input"
                            placeholder="Enter planned budget"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Actual Spending (₹)
                        </label>
                        <input
                            type="number"
                            value={actualSpending}
                            onChange={(e) => setActualSpending(e.target.value)}
                            className="form-input"
                            placeholder="Enter actual spending"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Revenue (₹)
                        </label>
                        <input
                            type="number"
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            className="form-input"
                            placeholder="Enter revenue"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Expenses (₹)
                        </label>
                        <input
                            type="number"
                            value={expenses}
                            onChange={(e) => setExpenses(e.target.value)}
                            className="form-input"
                            placeholder="Enter expenses"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                    <Calculator className="w-5 h-5 text-warning-400" />
                    <h3 className="text-lg font-semibold text-white">Additional Information</h3>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Contractor Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="form-input"
                        placeholder="Enter contractor name"
                        required
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full btn-primary text-lg py-3 flex items-center justify-center space-x-2"
                >
                    <Save className="w-5 h-5" />
                    <span>Save Project Details</span>
                </button>
            </div>
        </form>
    );
};

export default PreEMIInputForm;