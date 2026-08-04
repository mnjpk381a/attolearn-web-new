// src/utils/printUtils.ts

export interface PrintOptions {
  title?: string;
  styles?: string;
  content: string;
  customStyles?: string;
  scripts?: string;
  watermarkHTML?: string;
  /** Resolve relative URLs (e.g. /assets/...) in print/PDF preview */
  baseHref?: string;
}
// Add to src/utils/printUtils.ts
export interface PaperPrintOptions {
  title: string;
  content: string;
  logoHTML?: string;
  watermarkHTML?: string;
  customStyles?: string;
  baseHref?: string;
}

export const getPaperPrintTemplate = (options: PaperPrintOptions): string => {
  const {
    title,
    content,
    logoHTML = "",
    watermarkHTML = "",
    customStyles = "",
    baseHref
  } = options;

  const baseStyles = getDocumentStyles() +
    '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';

  const paperStyles = `
    body { padding: 0.5in 0.6in; font-family: Inter, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #111; background: white !important; }
    h1, h2, h3, h4, h5, h6 { color: #111; margin: 0; }
    p, td, th, span, div { color: #111; }
    h1 { font-size: 24px !important; }
    h2 { font-size: 18px !important; }
    h3 { font-size: 16px !important; }
    .paper-header-logo {
      width: 100px !important;
      height: 100px !important;
      min-width: 100px !important;
      min-height: 100px !important;
      max-width: 100px !important;
      max-height: 100px !important;
      object-fit: contain !important;
      flex-shrink: 0 !important;
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-text {
      white-space: pre-wrap !important;
      word-break: break-word !important;
    }
    /* Bilingual paper: two columns + wrapping so text does not overlap in print/PDF preview. */
    .paper-bilingual-split {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      align-items: start !important;
      column-gap: 10px !important;
      row-gap: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      line-height: 1.35 !important;
    }
    .paper-bilingual-split > * {
      min-width: 0 !important;
      max-width: 100% !important;
      overflow-wrap: break-word !important;
      word-wrap: break-word !important;
      padding-left: 4px !important;
      padding-right: 4px !important;
      box-sizing: border-box !important;
    }
    .paper-bilingual-split .flex-1,
    .paper-bilingual-split [class*="min-w-0"] {
      min-width: 0 !important;
    }
    .paper-bilingual-split .flex {
      min-width: 0 !important;
    }
    .paper-bilingual-split table {
      width: 100% !important;
      max-width: 100% !important;
      table-layout: fixed !important;
    }
    .paper-bilingual-split td,
    .paper-bilingual-split th {
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }
    /* Keep stem + options (and index row) together when printing */
    .paper-bilingual-mcq-item,
    .paper-bilingual-sq-item,
    .paper-bilingual-lq-item {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    /* Bubble sheet: stay 4 columns; smaller cells so both halves fit */
    .paper-bilingual-split .paper-bilingual-bubble-outer {
      padding: 4px !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      gap: 1px 2px !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid > div {
      min-width: 0 !important;
      font-size: 6px !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid > div > div.flex {
      gap: 1px !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid [class*="rounded-full"] {
      width: 7px !important;
      height: 7px !important;
      min-width: 7px !important;
      min-height: 7px !important;
      border-width: 1px !important;
      box-sizing: border-box !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid .flex.flex-col > span {
      font-size: 5px !important;
      line-height: 1 !important;
    }
    .paper-bilingual-split .paper-bilingual-bubble-grid > div > span.font-bold {
      font-size: 7px !important;
      line-height: 1 !important;
    }
    .paper-bilingual-split .grid.grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    .paper-bilingual-split h3 {
      display: block !important;
      max-width: 100% !important;
    }
    /* Watermark should also appear in print/PDF preview */
    .paper-watermark {
      display: none !important;
    }
    /* Header logo: 100×100 like paper preview (works with cloneNode + print window) */
    .print-logo {
      position: absolute; top: 0px; right: 0px;
      width: 100px; height: 100px; border-radius: 100%;
      border: 1px solid #000; object-fit: contain;
    }
    .page-number {
      position: relative !important;
      z-index: 1 !important;
    }
    .print-page-watermark {
      position: fixed !important;
      inset: 0 !important;
      display: block !important;
      pointer-events: none !important;
      z-index: 0 !important;
    }
    .print-page-watermark > * {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) rotate(-25deg) !important;
      max-width: 72% !important;
      max-height: 72% !important;
      width: auto !important;
      height: auto !important;
      opacity: 0.1 !important;
    }
    .print-page-watermark span {
      font-size: 70px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.25em !important;
      color: #000 !important;
    }
    .print-wrapper {
      position: relative !important;
      z-index: 1 !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .page-number {
      position: relative !important;
      z-index: 1 !important;
    }
    .print-page-watermark {
      position: fixed !important;
      inset: 0 !important;
      pointer-events: none !important;
      z-index: 0 !important;
    }
    .print-page-watermark > * {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) rotate(-25deg) !important;
      max-width: 70% !important;
      max-height: 70% !important;
      width: auto !important;
      height: auto !important;
      opacity: 0.12 !important;
    }
    .print-page-watermark span {
      font-size: 64px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.2em !important;
      color: #000 !important;
    }
    .print-wrapper {
      position: relative !important;
      z-index: 1 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    @page { 
      margin: 0.5in; 
      counter-increment: page; 
      size: letter;
      /* Hide browser-generated headers and footers */
      @top-left { content: ""; }
      @top-center { content: ""; }
      @top-right { content: ""; }
      @bottom-left { content: ""; }
      @bottom-center { content: ""; }
      @bottom-right { content: ""; }
    }
    .page-number::after {
      content: "Page " counter(page);
      position: fixed; bottom: 0.3in; right: 0.3in;
      font-size: 10px; color: gray;
    }
    @media print {
      body { 
        -webkit-print-color-adjust: exact; 
        print-color-adjust: exact; 
        padding: 0;
        font-size: 12px;
        line-height: 1.5;
      }
      .avoid-break { page-break-inside: avoid; }
      .page-break { page-break-after: always; }
      .page-break:last-child { page-break-after: auto !important; }
      
      /* Keep footer on same page */
      div[style*="pageBreakInside"],
      .paper-footer {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-before: avoid !important;
        break-before: avoid !important;
        orphans: 3 !important;
        widows: 3 !important;
      }
      
      /* Keep last question section and footer together */
      div:has(.paper-footer),
      .mb-3:has(.paper-footer) {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      /* Ensure last question doesn't break away from footer */
      .paper-footer {
        margin-top: 0.5rem !important;
        padding-top: 0.5rem !important;
      }
      
      /* Prevent page break before footer */
      .paper-footer::before {
        content: "";
        display: block;
        page-break-after: avoid;
        break-after: avoid;
        height: 0;
      }
      
      /* Keep at least 2 lines with footer */
      .paper-footer {
        orphans: 2 !important;
        widows: 2 !important;
      }
      * { 
        box-sizing: border-box;
      }
      .grid { 
        display: grid !important;
      }
      .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
      
      /* Hide any browser-generated content like "about:blank" */
      body::before,
      body::after {
        display: none !important;
        content: none !important;
      }
      
      /* Hide any URL text that might appear in print */
      *::before,
      *::after {
        content: none !important;
      }
      
      /* Hide browser print headers and footers */
      @page {
        margin: 0.5in;
        @top-left { content: ""; }
        @top-center { content: ""; }
        @top-right { content: ""; }
        @bottom-left { content: ""; }
        @bottom-center { content: ""; }
        @bottom-right { content: ""; }
      }
    }
    ${customStyles}
  `;

  const printScript = `
    window.onload = function() {
      setTimeout(() => { window.print(); }, 100);
    };
    window.onafterprint = function() {
      setTimeout(() => { window.close(); }, 300);
    };
  `;

  const wrapperPadding = logoHTML.trim()
    ? "6px 72px 10px 8px"
    : "8px";
  const wrapperStyle = `position: relative; padding: ${wrapperPadding}; max-width: 100%; box-sizing: border-box;`;

  return getPrintHtmlTemplate({
    title,
    styles: baseStyles,
    content: `<div class="page-number" style="${wrapperStyle}">${logoHTML}${content}</div>`,
    watermarkHTML,
    customStyles: paperStyles,
    scripts: printScript,
    baseHref
  });
};

export const getPrintHtmlTemplate = (options: PrintOptions): string => {
  const {
    title = "Document",
    styles = "",
    content,
    customStyles = "",
    watermarkHTML = "",
    baseHref,
    scripts = `
      setTimeout(() => {
        window.print();
        setTimeout(() => { window.close(); }, 100);
      }, 300);
    `
  } = options;

  const baseTag =
    baseHref && baseHref.trim()
      ? `<base href="${baseHref.replace(/"/g, "&quot;")}">`
      : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        ${baseTag}
        ${styles}
        <style>
          @page {
            size: auto;
            margin: 0mm;
            /* Hide browser-generated headers and footers */
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          .print-button {
            display: none !important;
          }
          .print-wrapper {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          ${customStyles}
          
          /* Hide any URL or browser-generated text */
          body::before,
          body::after {
            display: none !important;
            content: none !important;
          }
          
          @media print {
            body::before,
            body::after {
              display: none !important;
              content: none !important;
            }
            
            /* Hide browser print headers and footers */
            @page {
              @top-left { content: ""; }
              @top-center { content: ""; }
              @top-right { content: ""; }
              @bottom-left { content: ""; }
              @bottom-center { content: ""; }
              @bottom-right { content: ""; }
            }
          }
        </style>
      </head>
      <body>
        <div class="print-page-watermark">${watermarkHTML}</div>
        <div class="print-wrapper">${content}</div>
        <script>${scripts}</script>
      </body>
    </html>
  `;
};

// Helper function to get styles from current document
export const getDocumentStyles = (): string => {
  if (typeof document === 'undefined') return ''; // For SSR safety

  return Array.from(
    document.querySelectorAll('style, link[rel="stylesheet"]')
  )
    .map((el) => el.outerHTML)
    .join("\n");
};

// Certificate-specific template (optional)
export const getCertificatePrintTemplate = (
  content: string,
  qrDataUrl?: string
): string => {
  const certificateStyles = `
    .qr-container img { 
      width: 100px !important; 
      height: 100px !important; 
    }
    @media print {
      .qr-container img { 
        width: 100px !important; 
        height: 100px !important; 
      }
    }
  `;

  return getPrintHtmlTemplate({
    title: "Certificate",
    content,
    customStyles: certificateStyles
  });
};