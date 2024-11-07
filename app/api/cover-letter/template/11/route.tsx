import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#f7f7f7', // Light gray background
      padding: 30,
      fontFamily: 'Helvetica',
    },
    headerSection: {
      marginBottom: 30,
      textAlign: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
    },
    contactInfo: {
      fontSize: 12,
      color: '#555555',
      marginBottom: 4,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
    },
    leftColumn: {
      width: '40%',
      paddingRight: 20,
    },
    rightColumn: {
      width: '60%',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 4,
    },
    recipient: {
      fontSize: 12,
      color: '#555555',
      marginBottom: 2,
    },
    letterDetails: {
      fontSize: 12,
      lineHeight: 1.5,
      color: '#333333',
      marginTop: 20,
    },
    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: 'center',
      color: '#777777',
    },
    dividerLine: {
      width: '100%',
      height: 1,
      backgroundColor: '#cccccc',
      marginVertical: 10,
    },
  });

  const CoverLetterDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Applicant's Name */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{formData.firstName} {formData.lastName}</Text>
          <Text style={styles.contactInfo}>{formData.email}</Text>
          <Text style={styles.contactInfo}>{formData.phone}</Text>
          <Text style={styles.contactInfo}>{formData.address}</Text>
        </View>

        <View style={styles.container}>
          {/* Left Column: Recipient Details */}
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>To:</Text>
            <Text style={styles.recipient}>{formData.hiringManager}</Text>
            <Text style={styles.recipient}>{formData.companyName}</Text>
          </View>

          {/* Right Column: Letter Content */}
          <View style={styles.rightColumn}>
            <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.dividerLine} />

        {/* Footer */}
        <Text style={styles.footer}>Thank you for considering my application.</Text>
      </Page>
    </Document>
  );

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const pdfBuffer: any = await pdf(CoverLetterDocument).toBuffer();

 const pdfArrayBuffer = await new Response(pdfBuffer).arrayBuffer();
 const pdfUint8Array = new Uint8Array(pdfArrayBuffer);

 return new NextResponse(pdfUint8Array, {
   headers: {
     'Content-Type': 'application/pdf',
     'Content-Disposition': 'attachment; filename="Cover_Letter.pdf"',
   },
 });
}