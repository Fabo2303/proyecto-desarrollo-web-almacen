import React, { useState } from "react";
import * as XLSX from "xlsx";

interface ReportProps {
    data: Record<string, any>[];
    nombre: string;
}

const ReporteExcel: React.FC<ReportProps> = ({ data , nombre}) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${nombre}`);
        setTimeout(() => {
            XLSX.writeFile(wb, `${nombre}.xlsx`);
            setLoading(false);
        }, 1000);
    }

    return (
        <div>
            {
                loading ? <button>Descargando...</button> : <button onClick={handleDownload} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-blue-600">Reporte {nombre}</button>
            }
        </div>
    );
};

export default ReporteExcel;