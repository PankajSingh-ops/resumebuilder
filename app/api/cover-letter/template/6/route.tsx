import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define styles with a background color and a modern, professional layout
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#f2f7fa', // Light blue background for a modern look
      padding: 40,
      fontFamily: 'Helvetica',
    },
    headerSection: {
      backgroundColor: '#2b6cb0', // Dark blue for contrast
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff', // White text for contrast against the dark background
    },
    contactInfo: {
      fontSize: 10,
      color: '#ffffff',
      marginTop: 2,
    },
    line: {
      marginVertical: 12,
      height: 1,
      backgroundColor: '#cccccc',
    },
    recipientInfo: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#e6f0fa',
      borderRadius: 5,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 5,
    },
    recipient: {
      fontSize: 12,
      color: '#333333',
      marginBottom: 3,
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
      color: '#555555',
    },
  });

  const CoverLetterDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Name and Contact Information */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{formData.firstName} {formData.lastName}</Text>
          <Text style={styles.contactInfo}>{formData.email} | {formData.phone} | {formData.address}</Text>
        </View>

        {/* Recipient Information Section with Light Background */}
        <View style={styles.recipientInfo}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>

        {/* Divider Line */}
        <View style={styles.line} />

        {/* Cover Letter Content */}
        <View>
          <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
        </View>

        {/* Footer Section */}
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