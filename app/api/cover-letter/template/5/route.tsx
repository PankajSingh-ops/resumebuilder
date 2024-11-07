import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define styles for a structured PDF with dividing lines and emphasis on key information
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 5,
    },
    line: {
      marginVertical: 10,
      height: 1,
      backgroundColor: '#cccccc',
    },
    contactInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    contactInfo: {
      fontSize: 10,
      color: '#555555',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 6,
    },
    recipientInfo: {
      marginBottom: 10,
    },
    recipient: {
      fontSize: 12,
      color: '#333333',
      marginBottom: 2,
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.5,
      color: '#444444',
      marginTop: 10,
    },
    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: 'center',
      color: '#999999',
    },
  });

  const CoverLetterDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sender Name */}
        <Text style={styles.name}>{formData.firstName} {formData.lastName}</Text>

        {/* Contact Information with Divider */}
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfo}>{formData.email}</Text>
          <Text style={styles.contactInfo}>{formData.phone}</Text>
          <Text style={styles.contactInfo}>{formData.address}</Text>
        </View>
        <View style={styles.line} />

        {/* Recipient Information with Divider */}
        <View style={styles.recipientInfo}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>
        <View style={styles.line} />

        {/* Letter Content */}
        <View>
          <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
        </View>

        {/* Footer */}
        <View style={styles.line} />
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