import React, { useState } from "react";

interface TableProps {
    data: Record<string, any>[];
    columns: string[];
    handleSearch: (searchColumn: string, searchText: string) => void;
    rowClassName: (row: any) => string;
    children?: React.ReactNode;
    btnfunction: (row: any) => void;
    //functionBtn: () => void;
    //conditionalValue: boolean;
}

const Table: React.FC<TableProps> = ({ data, columns, handleSearch, rowClassName, btnfunction, children }) => {
    const [searchText, setSearchText] = useState("");
    const [searchColumn, setSearchColumn] = useState(columns[0]);

    const filteredData = data.filter((row) => {
        return row[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase());
    });

    const handleButton = () => {
        handleSearch(searchColumn, searchText);
    }

    return (
        <div className="absolute top-20 w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-center space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
                <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                    {columns.map((column, index) => (
                        <option key={index} value={column}>{column}</option>
                    ))}
                </select>
                <button
                    onClick={handleButton}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Buscar
                </button>
                {children}
            </div>
            <table className="w-[90%]">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-4 py-2 font-bold">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index} className={`${rowClassName(row)} text-center`} onClick={() => btnfunction(row)}>
                            {columns.map((column, index) => (
                                <td key={index} className="px-4 py-2">{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;