import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define a style with a dark background and light text, suitable for a modern IT cover letter
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#2e3b4e', // Dark navy background for a sophisticated look
      padding: 40,
      fontFamily: 'Helvetica',
    },
    headerSection: {
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff', // White text for high contrast
      marginBottom: 2,
    },
    contactInfo: {
      fontSize: 10,
      color: '#cfd8e3', // Light grey text for subtle contrast
    },
    sectionDivider: {
      height: 1,
      backgroundColor: '#555b6e', // Darker grey line to separate sections
      marginVertical: 15,
    },
    recipientInfo: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#d1d9e6',
      marginBottom: 4,
    },
    recipient: {
      fontSize: 12,
      color: '#d1d9e6',
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.6,
      color: '#f5f5f5', // White for better readability on a dark background
      marginTop: 10,
    },
    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: 'center',
      color: '#aeb2bb',
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

        {/* Divider Line */}
        <View style={styles.sectionDivider} />

        {/* Recipient Information Section */}
        <View style={styles.recipientInfo}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>

        {/* Divider Line */}
        <View style={styles.sectionDivider} />

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