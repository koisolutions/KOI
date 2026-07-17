// =====================================================================
//  Generador de PDF simple con paginación, títulos, párrafos y firma.
//  Los documentos se descargan como .pdf reales (no impresión).
//  jsPDF se importa dinámicamente para no evaluarlo en SSR.
// =====================================================================

export type Bloque =
  | { tipo: "h1"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "space"; alto?: number }
  | { tipo: "divider" }
  | { tipo: "firma" }; // dos líneas de firma lado a lado

const KOI = { r: 228, g: 99, b: 58 };
const TEXTO = { r: 24, g: 30, b: 34 };
const GRIS = { r: 120, g: 132, b: 138 };

export async function generarPDF(
  nombreArchivo: string,
  titulo: string,
  bloques: Bloque[]
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;
  const bottomLimit = pageH - margin - 24;
  let y = margin;

  const encabezado = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(KOI.r, KOI.g, KOI.b);
    doc.text("KOI", margin, margin - 20);
    doc.setTextColor(GRIS.r, GRIS.g, GRIS.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("SOLUTIONS", margin + 26, margin - 20);
    doc.setDrawColor(220, 224, 226);
    doc.line(margin, margin - 8, pageW - margin, margin - 8);
    y = margin + 6;
  };

  const pie = () => {
    const page = doc.getNumberOfPages();
    doc.setDrawColor(230, 233, 235);
    doc.line(margin, pageH - margin - 6, pageW - margin, pageH - margin - 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(GRIS.r, GRIS.g, GRIS.b);
    doc.text("KOI Labs Solutions SpA · koi.cl", margin, pageH - margin + 6);
    doc.text(`Página ${page}`, pageW - margin, pageH - margin + 6, {
      align: "right",
    });
  };

  const saltoPaginaSiHaceFalta = (alto: number) => {
    if (y + alto > bottomLimit) {
      pie();
      doc.addPage();
      encabezado();
    }
  };

  encabezado();

  // Título del documento
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(TEXTO.r, TEXTO.g, TEXTO.b);
  const tituloLineas = doc.splitTextToSize(titulo, contentW);
  doc.text(tituloLineas, margin, y + 16);
  y += 16 + tituloLineas.length * 20 + 10;

  for (const b of bloques) {
    if (b.tipo === "space") {
      y += b.alto ?? 10;
      continue;
    }
    if (b.tipo === "divider") {
      saltoPaginaSiHaceFalta(16);
      doc.setDrawColor(225, 228, 230);
      doc.line(margin, y, pageW - margin, y);
      y += 16;
      continue;
    }
    if (b.tipo === "firma") {
      saltoPaginaSiHaceFalta(50);
      y += 24;
      const colW = contentW / 2;
      doc.setDrawColor(160, 168, 172);
      doc.line(margin, y, margin + colW - 30, y);
      doc.line(margin + colW + 10, y, pageW - margin, y);
      y += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(GRIS.r, GRIS.g, GRIS.b);
      doc.text("KOI Labs Solutions SpA", margin, y);
      doc.text("El Cliente", margin + colW + 10, y);
      y += 16;
      continue;
    }

    const cfg =
      b.tipo === "h1"
        ? { size: 14, style: "bold" as const, lh: 20, gap: 6 }
        : b.tipo === "h2"
        ? { size: 11, style: "bold" as const, lh: 16, gap: 4 }
        : { size: 10.5, style: "normal" as const, lh: 15.5, gap: 8 };

    doc.setFont("helvetica", cfg.style);
    doc.setFontSize(cfg.size);
    doc.setTextColor(
      b.tipo === "p" ? 55 : TEXTO.r,
      b.tipo === "p" ? 62 : TEXTO.g,
      b.tipo === "p" ? 68 : TEXTO.b
    );
    const lineas = doc.splitTextToSize(b.texto, contentW);
    for (const linea of lineas) {
      saltoPaginaSiHaceFalta(cfg.lh);
      doc.text(linea, margin, y);
      y += cfg.lh;
    }
    y += cfg.gap;
  }

  pie();
  doc.save(nombreArchivo.endsWith(".pdf") ? nombreArchivo : `${nombreArchivo}.pdf`);
}
