import puppeteer from 'puppeteer';

// const production = process.env.NODE_ENV === 'production';
import NextCors from 'nextjs-cors';

export default async function generatePdf(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST') {
    try {
      // allow cors

      const browser = await puppeteer.launch({
        headless: 'false',
        // executablePath: production ? '/usr/bin/google-chrome' : undefined,
        args: [`--no-sandbox`, `--disable-gpu`, `--disable-dev-shm-usage`],
      });

      const page = await browser.newPage();
      await page.emulateMediaType('print');

      const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
      </style>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Document</title>
      </head>
      <body>
       ${req.body.content}
      </body>
      </html>
      `;

      // if (!req.body.content) return;

      await page.setContent(template, {
        waitUntil: ['domcontentloaded', 'load', 'networkidle0', 'networkidle2'],
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      await browser.close();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
      res.status(200).end(pdfBuffer);
      // return res.status(200).json({ template });
    } catch (error) {
      console.error('dari response :', error);
      res.status(500).send('An error occurred while generating the PDF.');
    }
  } else {
    res.status(405).json({ message: 'Method yang diperbolehkan hanya POST.' });
  }
}
