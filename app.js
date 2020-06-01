const fs = require('fs')
const { PDFDocument } = require('pdf-lib')


const start = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    page.drawText('TEST CREATING PDF')
    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('./pdf.pdf', pdfBytes)
}

start()