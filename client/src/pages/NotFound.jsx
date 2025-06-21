import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";

const ExportComponentToPDF = () => {
  const contentRef = useRef();

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  return (
    <div>
      <div ref={contentRef} className="bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold">Invoice</h1>
        <p>Customer: John Doe</p>
        <p>Total: $123.45</p>
        {/* Add any styled HTML or components here */}
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Download as PDF
      </button>
    </div>
  );
};

export default ExportComponentToPDF;
