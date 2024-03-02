import ReporteExcel from '@react-component/ExcelComponent';
import ReportePDF from '@react-component/PdfComponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data1: Record<string, any>[];
    data2?: Record<string, any>[];
    headers: string[];
    title1: string;
    title2?: string;
}

const ModalDocument: React.FC<ModalProps> = ({ isOpen, onClose, data1, data2, headers, title1, title2 }) => {
    const [reportType, setReportType] = React.useState('excel');

    const handleReportType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReportType(e.target.value);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed flex z-10 top-0 left-0 w-full h-full bg-black/25 items-center justify-center">
            <div className="relative bg-zinc-300 w-[500px] min-h-[480px] rounded-lg">
                <span className="absolute top-[0.2rem] right-[0.5rem] text-3xl text-zinc-950 font-bold cursor-pointer hover:text-red-900" onClick={onClose}>&times;</span>
                <div>
                    <select value={reportType} onChange={handleReportType} className="absolute top-10 left-[50%] translate-x-[-50%] px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500">
                        <option value="excel">Excel</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <div className="absolute top-44 left-[50%] translate-x-[-50%] flex flex-col gap-10">
                        {renderReport(data1, headers, title1, reportType)}
                        {data2 && renderReport(data2, headers, title2 ? title2 : '', reportType)} {/* Verificar si data2 está presente antes de renderizar */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const renderReport = (data: Record<string, any>[], columns: string[], nombre: string, reportType: string) => {
    if (data.length > 0 && reportType === 'excel') {
        return <ReporteExcel data={data} nombre={nombre} />;
    } else if (data.length > 0) {
        return (
            <PDFDownloadLink
                document={<ReportePDF data={data} headers={columns} />}
                fileName={`Reporte${nombre.charAt(0).toUpperCase() + nombre.slice(1)}.pdf`}
            >
                {({ loading }) => (
                    loading ? <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-blue-600">Cargando documento...</button> :
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-blue-600">Reporte {nombre}</button>
                )}
            </PDFDownloadLink>
        );
    }
    return null;
}

export default ModalDocument;
