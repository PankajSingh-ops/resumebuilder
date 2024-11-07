import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define enhanced styles for a professional PDF appearance
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333333',
    },
    section: {
      marginBottom: 12,
    },
    contactInfo: {
      fontSize: 10,
      color: '#666666',
      marginBottom: 20,
    },
    bold: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    value: {
      fontSize: 12,
      color: '#333333',
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.6,
      color: '#333333',
    },
    footer: {
      marginTop: 20,
      fontSize: 10,
      textAlign: 'center',
      color: '#666666',
    },
  });

  const CoverLetterDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.contactInfo}>
            {formData.firstName} {formData.lastName} | {formData.email} | {formData.phone} | {formData.address}
          </Text>
        </View>

        {/* Recipient Information */}
        <View style={styles.section}>
          <Text style={styles.bold}>To:</Text>
          <Text style={styles.value}>{formData.hiringManager}</Text>
          <Text style={styles.value}>{formData.companyName}</Text>
        </View>

        {/* Cover Letter Details */}
        <View style={styles.section}>
          <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your consideration.</Text>
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