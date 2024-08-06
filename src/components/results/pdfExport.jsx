// pdfExport.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const getBase64ImageFromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const exportToPDF = async (data, scenarios, VULGA, INDICATEURS) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  // Function to add a header
  const addHeader = (doc, title) => {
    doc.setFontSize(12);
    doc.text(title, margin, 10);
    doc.line(margin, 12, pageWidth - margin, 12); // Horizontal line
  };

  // Function to add a footer
  const addFooter = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text('Soleil Bleu Loire-Atlantique', margin, pageHeight - 10);
    doc.text(`Page ${pageCount}`, pageWidth - margin - 10, pageHeight - 10);
  };

  // Title Page
  doc.setFontSize(24);
  doc.text("Etude d'autoconsommation\nphotovoltaïque", pageWidth / 2, 40, { align: 'center' });
  doc.setFontSize(16);
  doc.text('par Soleil Bleu', pageWidth / 2, 60, { align: 'center' });

  // Add the image
  const imagePath = '/public/solar-panel-installation.jpg'; // Adjust path if necessary
  const imageBase64 = await getBase64ImageFromUrl(imagePath);
  doc.addImage(imageBase64, 'JPEG', margin, 80, pageWidth - 2 * margin, pageHeight / 3);

  // Disclaimer
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(10);
  doc.setFont('italic');
  doc.text(`Cette étude est basée sur des prévisions et des estimations. Les résultats peuvent varier en fonction des conditions réelles. Soleil Bleu ne peut être tenu responsable des différences entre les prévisions et les résultats réels.`, margin, pageHeight / 3 + 100, { maxWidth });
  doc.setTextColor(0, 0, 0); // Reset text color
  doc.setFont('normal'); // Reset font style

  addFooter(doc);
  doc.addPage();

  // Scenario parts to be included in the report
  const scenarioParts = [
    { key: 'description', label: 'Objectif' },
    { key: 'financier', label: 'Financier' },
    { key: 'environnement', label: 'Environmental' },
  ];

  // Iterate through each scenario and create a new page
  scenarios.forEach((scenario, index) => {
    if (index !== 0) doc.addPage();

    addHeader(doc, `Scénario : ${scenario.name}`);
    addFooter(doc);

    doc.setFontSize(18);
    doc.text(`Scénario : ${scenario.name}`, pageWidth / 2, 28, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Puissance à installer : ${Math.round(scenario.puissance)} kW (crête)`, margin, 40, { maxWidth });

    if (scenario.warning) {
      doc.setTextColor(255, 0, 0);
      doc.text(`Attention : ${scenario.warning}`, margin, 50, { maxWidth });
      doc.setTextColor(0, 0, 0);
    }

    let yPosition = 60;

    // Gather all information into one text chunk with line breaks
    const combinedText = scenarioParts.map(part => `${VULGA[scenario.name]?.[part.key] || 'N/A'}`).join('\n\n');

    doc.text(combinedText, margin, yPosition, { maxWidth });
    yPosition += 60; // Adjust spacing as needed

    const highlightedData = data.points_simu.find(point => point.puissance === scenario.puissance);

    // Add a table for indicators
    const indicatorRows = INDICATEURS.map(({ key, label, unit }) => {
      const value = highlightedData ? highlightedData[key] : undefined;
      return value !== undefined ? [label, `${value} ${unit}`] : null;
    }).filter(indicator => indicator !== null);

    if (indicatorRows.length > 0) {
      doc.autoTable({
        startY: yPosition,
        head: [['Indicateur', 'Valeur']],
        body: indicatorRows,
        margin: { left: margin, right: margin },
        styles: { fontSize: 10 },
      });
    }

    yPosition = doc.previousAutoTable.finalY + 10; // Update yPosition after the table
  });

  doc.save('report.pdf');
};

export default exportToPDF;
