import React from 'react';

const DataTable = ({ data }) => {
    return (
        <div className="container mx-auto p-4 bg-gray-900 min-h-screen flex items-center justify-center">
            <table className="min-w-full bg-gray-800 text-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-700">Name</th>
                        <th className="py-2 px-4 border-b border-gray-700">Project</th>
                        <th className="py-2 px-4 border-b border-gray-700">Location</th>
                        <th className="py-2 px-4 border-b border-gray-700">Project Value</th>
                        <th className="py-2 px-4 border-b border-gray-700">Project Time Period</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b border-gray-700">{item.name}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{item.selectedProject}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{item.selectedLocation}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{item.projectValue}</td>
                            <td className="py-2 px-4 border-b border-gray-700">{item.projectTimePeriod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
