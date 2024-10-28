declare module 'html2pdf.js' {
  type OutputType = 'blob' | 'datauristring' | 'dataurlstring' | 'dataurlnewwindow';
  
  interface Html2PdfImage {
    type: 'jpeg' | 'png' | 'webp';
    quality: number;
  }

  interface Html2CanvasOptions {
    scale: number;
    useCORS: boolean;
    logging: boolean;
    letterRendering: boolean;
  }

  interface JsPDFOptions {
    unit: 'pt' | 'px' | 'in' | 'mm' | 'cm';
    format: string;
    orientation: 'portrait' | 'landscape';
    compress: boolean;
  }

  type PageBreakMode = 'avoid-all' | 'css' | 'legacy';

  interface PageBreakOptions {
    mode: PageBreakMode[];
    before?: string[];
    after?: string[];
    avoid?: string[];
  }

  interface Html2PdfOptions {
    margin?: number | [number, number] | [number, number, number, number];
    filename?: string;
    image?: Html2PdfImage;
    html2canvas?: Html2CanvasOptions;
    jsPDF?: JsPDFOptions;
    pagebreak?: PageBreakOptions;
  }

  type OutputOptions = {
    name?: string;
    autoPrint?: boolean;
    optionalContentConfigurationDict?: {
      name: string;
      creator: string;
    };
  };

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: Element | string): Html2PdfInstance;
    save(): Promise<void>;
    output(type: OutputType, options?: OutputOptions): Promise<Blob | string | Window>;
    then(callback: (pdf: Html2PdfInstance) => void | Promise<void>): Html2PdfInstance;
    catch(callback: (error: Error) => void): Html2PdfInstance;
  }

  export default function html2pdf(): Html2PdfInstance;
}