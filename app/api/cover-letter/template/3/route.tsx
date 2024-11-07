import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define updated styles for a refined, professional PDF layout
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#2B2B2B',
      textAlign: 'left',
    },
    subHeader: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#444444',
      marginBottom: 5,
    },
    section: {
      marginBottom: 16,
    },
    contactInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    contactInfo: {
      fontSize: 10,
      color: '#555555',
    },
    recipient: {
      fontSize: 12,
      marginBottom: 5,
      color: '#333333',
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
      lineHeight: 1.5,
      color: '#444444',
    },
    footer: {
      marginTop: 20,
      fontSize: 10,
      textAlign: 'center',
      color: '#999999',
    },
  });

  const CoverLetterDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {/* Contact Information */}
        <View style={styles.contactInfoContainer}>
          <View>
            <Text style={styles.contactInfo}>{formData.firstName} {formData.lastName}</Text>
            <Text style={styles.contactInfo}>{formData.email}</Text>
          </View>
          <View>
            <Text style={styles.contactInfo}>{formData.phone}</Text>
            <Text style={styles.contactInfo}>{formData.address}</Text>
          </View>
        </View>

        {/* Recipient Information */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>

        {/* Cover Letter Body */}
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