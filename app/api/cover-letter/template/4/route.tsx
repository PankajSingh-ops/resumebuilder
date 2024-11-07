import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  // Define professional styles with a subtle background color and larger font for the name
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#f9f9f9', // Subtle light grey background for a modern look
      padding: 40,
      fontFamily: 'Helvetica',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2A2A2A',
      marginBottom: 6,
    },
    contactInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
    },
    contactInfo: {
      fontSize: 10,
      color: '#555555',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333333',
      marginTop: 20,
      marginBottom: 6,
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
      marginTop: 16,
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
        {/* Name */}
        <Text style={styles.name}>{formData.firstName} {formData.lastName}</Text>

        {/* Contact Information */}
        <View style={styles.contactInfoContainer}>
          <View>
            <Text style={styles.contactInfo}>{formData.email}</Text>
          </View>
          <View>
            <Text style={styles.contactInfo}>{formData.phone}</Text>
          </View>
          <View>
            <Text style={styles.contactInfo}>{formData.address}</Text>
          </View>
        </View>

        {/* Recipient Information */}
        <View>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text style={styles.recipient}>{formData.hiringManager}</Text>
          <Text style={styles.recipient}>{formData.companyName}</Text>
        </View>

        {/* Cover Letter Body */}
        <View>
          <Text style={styles.letterDetails}>{formData.letterDetails}</Text>
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