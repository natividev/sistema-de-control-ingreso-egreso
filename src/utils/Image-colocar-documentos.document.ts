import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';

export const insertImageToDocument = async (
  buffer: Buffer,
): Promise<Buffer> => {
  const pdfDoc = await PDFDocument.load(buffer);

  const logoPath = path.resolve(
    __dirname,
    '../templates/image/logo-adesco.png',
  );

  // Lee el archivo como buffer
  const logoBuffer = fs.readFileSync(logoPath);

  // Inserta la imagen
  const logo = await pdfDoc.embedPng(logoBuffer);

  const pdfPage = pdfDoc.getPage(0);
  const { width, height } = pdfPage.getSize();

  // quiero moverla a la izquierda y arriba
  const imgY = height - 22 - 157 + 57;
  const imgX = width - 600;

  pdfPage.drawImage(logo, {
    x: imgX,
    y: imgY,
    width: 100,
    height: 100,
  });

  const newBuffer = await pdfDoc.save();

  return Buffer.from(newBuffer);
};
