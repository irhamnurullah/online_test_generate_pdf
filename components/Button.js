import React, { useEffect } from 'react';

export default function ButtonDownloadPdf(props) {
  // async function handlerFetch() {
  //   try {
  //     console.log(props.data);
  //     const response = await fetch('http://localhost:3001/api/holla');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   if (props.data) {
  //     console.log(props.data);
  //   }
  // }, [props.data]);

  return (
    <>
      <button className="text-black">{props.children}</button>
    </>
  );
}
