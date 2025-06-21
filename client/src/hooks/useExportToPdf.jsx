import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function usePDFExport() {
  const exportToPDF = async (elementRef, filename = "download.pdf") => {
    if (!elementRef?.current) return;

    const canvas = await html2canvas(elementRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  };

  return { exportToPDF };
}
