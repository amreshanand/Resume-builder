import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(elementId, filename = 'resume.pdf') {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Resume element not found');

    // Temporarily scale to full size for capture
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
    });

    element.style.transform = originalTransform;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    let pageCount = 0;

    while (position < imgHeight) {
        if (pageCount > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
        position += pageHeight;
        pageCount++;
    }

    pdf.save(filename);
}
