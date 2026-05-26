import { jsPDF } from "jspdf";
import { DEFAULT_BIO, DEFAULT_CERTIFICATIONS, DEFAULT_PROJECTS } from "../data";

export function generateCV() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Primary: 18, 18, 24 (Dark Charcoal) Accent: 5, 150, 105 (Emerald)
  const setPrimaryColor = () => doc.setTextColor(26, 26, 32);
  const setSecondaryColor = () => doc.setTextColor(85, 85, 98);
  const setAccentColor = () => doc.setTextColor(5, 150, 105);

  const drawDivider = (currentY: number) => {
    doc.setDrawColor(220, 220, 222);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
  };

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 5) {
      doc.addPage();
      y = 15;
      return true;
    }
    return false;
  };

  // --- HEADER SECTION ---
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  setPrimaryColor();
  doc.text(DEFAULT_BIO.name.toUpperCase(), margin, y);
  y += 6;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  setAccentColor();
  doc.text(DEFAULT_BIO.shortRole.toUpperCase(), margin, y);
  y += 5;

  // Contact Info row
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  setSecondaryColor();
  const contactLines = [
    `Email: ${DEFAULT_BIO.email}`,
    `Phones: ${DEFAULT_BIO.phone} | ${DEFAULT_BIO.altPhone}`,
    `Address: ${DEFAULT_BIO.location}`,
  ];
  doc.text(contactLines.join("   |   "), margin, y);
  y += 6;

  drawDivider(y);
  y += 7;

  // --- PROFESSIONAL SUMMARY ---
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("CORE PROFILE & SUMMARY", margin, y);
  y += 5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  setSecondaryColor();
  const summaryText = `${DEFAULT_BIO.longBio} ${DEFAULT_BIO.subBio}`;
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 4;

  // --- CORE SYSTEM CERTIFICATIONS ---
  checkPageOverflow(30);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("TECHNICAL CERTIFICATIONS", margin, y);
  y += 5;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  
  // Render certificates in dual rows or listed cleanly
  const certsToRender = DEFAULT_CERTIFICATIONS.slice(0, 8); // Grab main 8
  certsToRender.forEach((cert) => {
    checkPageOverflow(8);
    doc.setFont("Helvetica", "bold");
    setPrimaryColor();
    doc.text(`\u2022 ${cert.name}`, margin, y);
    
    doc.setFont("Helvetica", "normal");
    setSecondaryColor();
    const rightText = `${cert.issuer} (${cert.year})`;
    const rightX = pageWidth - margin - doc.getTextWidth(rightText);
    doc.text(rightText, rightX, y);
    y += 4.2;
  });
  y += 3;

  // --- PROFESSIONAL EXPERIENCE ---
  checkPageOverflow(25);
  drawDivider(y);
  y += 7;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  setPrimaryColor();
  doc.text("PROFESSIONAL HISTORY", margin, y);
  y += 6;

  DEFAULT_PROJECTS.forEach((proj) => {
    const roleHeader = `${proj.role}`;
    const companyHeader = `${proj.title}   |   ${proj.year}`;
    
    checkPageOverflow(25);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    setPrimaryColor();
    doc.text(roleHeader, margin, y);
    
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8.5);
    setSecondaryColor();
    const compX = pageWidth - margin - doc.getTextWidth(companyHeader);
    doc.text(companyHeader, compX, y);
    y += 4.5;

    // Bullet description
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    const splitDesc = doc.splitTextToSize(proj.description, contentWidth - 4);
    doc.text(splitDesc, margin + 4, y);
    y += splitDesc.length * 3.8 + 4;
  });

  // Save PDF to browser
  doc.save(`${DEFAULT_BIO.name.replace(/\s+/g, "_")}_CV.pdf`);
}
