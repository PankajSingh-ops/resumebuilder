import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define styles for a structured layout with contact details on the left and letter content on the right
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 40,
      fontFamily: 'Helvetica',
    },
    headerSection: {
      marginBottom: 20,
      textAlign: 'center',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1a1a1a', // Darker color for the name
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
    },
    leftColumn: {
      width: '40%',
      paddingRight: 10,
    },
    rightColumn: {
      width: '60%',
      paddingLeft: 10,
    },
    contactInfo: {
      fontSize: 10,
      color: '#4a4a4a', // Medium grey for contact information
      marginBottom: 6,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 4,
    },
    recipient: {
      fontSize: 11,
      color: '#333333',
      marginBottom: 2,
    },
    dividerLine: {
      width: '100%',
      height: 1,
      backgroundColor: '#dddddd',
      marginVertical: 10,
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.6,
      color: '#333333', // Standard dark color for the main letter content
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
        {/* Centered Header with Applicant's Name */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{formData.firstName} {formData.lastName}</Text>
        </View>

        <View style={styles.container}>
          {/* Left Column: Contact Information and Recipient Details */}
          <View style={styles.leftColumn}>
            {/* Contact Information */}
            <Text style={styles.contactInfo}>{formData.email}</Text>
            <Text style={styles.contactInfo}>{formData.phone}</Text>
            <Text style={styles.contactInfo}>{formData.address}</Text>

            <View style={styles.dividerLine} />

            {/* Recipient Information */}
            <Text style={styles.sectionTitle}>To:</Text>
            <Text style={styles.recipient}>{formData.hiringManager}</Text>
            <Text style={styles.recipient}>{formData.companyName}</Text>
          </View>

          {/* Right Column: Letter Content */}
          <View style={styles.rightColumn}>
            <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
          </View>
        </View>

        {/* Footer */}
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