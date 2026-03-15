import fs from 'fs';
import * as XLSX from 'xlsx';

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';


export async function extractTextFromPDF(filePath: string): Promise<string> {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item: any) => item.str)
            .join(' ');
        text += pageText + '\n';
    }

    return text;
}

export async function readExcelAsText(filePath: string): Promise<string> {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    let text = '';
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        if (sheet) {
            text += XLSX.utils.sheet_to_csv(sheet);
        }
    });
    return text;
}
