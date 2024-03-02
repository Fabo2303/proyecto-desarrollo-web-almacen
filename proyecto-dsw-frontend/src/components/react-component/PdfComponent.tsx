import React, { useState } from 'react';
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#EFF2B9',
        padding: 20,
    },
    section: {
        flexGrow: 1,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#D1D646',
        paddingVertical: 5,
        textAlign: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-around',
    },
    header:{
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 'bold',
    },
    cell: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        fontSize: 10,
    },
    tableCol: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    }
});

interface ReportProps {
    data: Record<string, any>[];
    headers: string[];
}

const ReportePDF: React.FC<ReportProps> = ({ data, headers }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.heading}>Reporte</Text>
                <View style={styles.tableCol}>
                    {headers.map((header, colIndex) => (
                        <View key={colIndex} style={styles.tableRow}>
                            <Text key={`header-${colIndex}`} style={styles.header}>
                                {header.toUpperCase()}
                            </Text>
                            {data.map((row, rowIndex) => (
                                <Text key={rowIndex} style={styles.cell}>
                                    {row[header]}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default ReportePDF;