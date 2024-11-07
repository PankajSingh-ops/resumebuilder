import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define styles for the PDF
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    section: { marginBottom: 10 },
    header: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  });

  const CoverLetterDocument = (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Cover Letter</Text>
        <Text style={styles.section}>From: {formData.firstName} {formData.lastName}</Text>
        <Text style={styles.section}>Email: {formData.email}</Text>
        <Text style={styles.section}>Phone: {formData.phone}</Text>
        <Text style={styles.section}>Address: {formData.address}</Text>
        <Text style={styles.section}>To: {formData.hiringManager} at {formData.companyName}</Text>
        <Text style={styles.section}>Letter Content:</Text>
        <Text>{formData.letterDetails}</Text>
      </Page>
    </Document>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer: any = await pdf(CoverLetterDocument).toBuffer();

  // Convert the ReadableStream to a Uint8Array
  const pdfArrayBuffer = await new Response(pdfBuffer).arrayBuffer();
  const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

  return new NextResponse(pdfUint8Array, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Cover_Letter.pdf"',
    },
  });
}