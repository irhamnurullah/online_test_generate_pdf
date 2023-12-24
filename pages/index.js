import Image from 'next/image';
import { Inter } from 'next/font/google';
import ButtonDownloadPdf from '@/components/Button';
import ReactDOMServer from 'react-dom/server';
const inter = Inter({ subsets: ['latin'] });

function TemplateReporting(value) {
  const htmlString = ReactDOMServer.renderToString(value);
  return htmlString;
}

async function getRemoteData() {
  const content = `<div className="text-bold">hello</div>`;

  const template = TemplateReporting(content);
  // console.log(template);

  try {
    const response = await fetch('/api/remote-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: template }),
    });
    const pdfBlob = await response.blob();
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-remote.pdf`;
    a.click();
  } catch (error) {
    console.log(error);
  }
}

export default function Home() {
  return (
    <>
      <button onClick={getRemoteData}>download pdf</button>
      {/* <ButtonDownloadPdf>hello</ButtonDownloadPdf> */}
    </>
  );
}
