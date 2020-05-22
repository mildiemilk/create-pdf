const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require("pdfmake/build/vfs_fonts")
const fs = require('fs')
const PdfPrinter = require('pdfmake/src/printer')
pdfMake.vfs = pdfFonts.pdfMake.vfs

const generatePDF = (docDefinition) => {
  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };
  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream('pdf/example.pdf'));
  pdfDoc.end();
}

module.exports = generatePDF