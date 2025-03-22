import React from 'react';

function DataTable({ data }) {
    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                    <th>Column 4</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.column1}</td>
                        <td>{item.column2}</td>
                        <td>{item.column3}</td>
                        <td>{item.column4}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
