import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define a clean and simple style with no background color
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    headerSection: {
      marginBottom: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333', // Dark grey for a professional look
      marginBottom: 4,
    },
    contactInfo: {
      fontSize: 10,
      color: '#555555', // Medium grey for secondary info
      marginBottom: 15,
    },
    divider: {
      height: 1,
      backgroundColor: '#dddddd', // Light grey line for subtle separation
      marginVertical: 15,
    },
    recipientInfo: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 5,
    },
    recipient: {
      fontSize: 12,
      color: '#333333',
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.6,
      color: '#333333',
      marginTop: 10,
    },
    footer: {
      marginTop: 20,
      fontSize: 10,
      textAlign: 'center',
      color: '#777777',
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
        <View style={styles.divider} />

        {/* Recipient Information Section */}
        <View style={styles.recipientInfo}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

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