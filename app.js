const fs = require('fs')
const path = require('path')
const { PDFDocument } = require('pdf-lib')

const start = async () => {

    const args = process.argv.slice(2)
    let filePath = args[0]

    if (args.length === 0) {
        console.log('Необходимо указать путь к файлу, или перетащите на .exe файл ваш документ .pdf')
    } else if (fs.existsSync(filePath)) {

        const extension = path.extname(filePath).toLowerCase()
        const filename = path.basename(filePath, extension)

        if (extension === '.pdf') {

            const pdfBytes = fs.readFileSync(filePath)
            const originalPDF = await PDFDocument.load(pdfBytes)
            const pages = originalPDF.getPages()

            if (!fs.existsSync(`./${filename}`)) { fs.mkdirSync(`./${filename}`) }

            console.log(`\nКоличество страниц: ${pages.length}\n`)

            for (let i = 0; i < pages.length; i++) {
                

                const newPDF = await PDFDocument.create();
                const [newPage] = await newPDF.copyPages(originalPDF, [i])

                newPDF.addPage(newPage)

                const newPDFBytes = await newPDF.save()
                fs.writeFileSync(`./${filename}/${i + 1}.pdf`, newPDFBytes)
                console.log(`Страница ${i + 1} сохранена `)
            }
            console.log('\nГотово!')
        } else {
            console.log('Неверный формат файла, только .pdf')
        }

    }
    
    setTimeout(() => { }, 3000)
   
}

start()