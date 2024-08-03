import React from 'react'
import { useState } from 'react';

export const UploadButton = function({}) {
//   const [files, setFiles] = useState([]);

// const handleDrop = (event:React.ChangeEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     const droppedFiles = event.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       const newFiles = Array.from(droppedFiles);
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//     }
//   };

  // 
  return (
    <div className='bg-white p-1.5 h-12 flex rounded-xl border-dashed border-2 border-blue-200'>
          <div className='bg-slate-300 p-1 mr-2 rounded-lg flex'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-800" viewBox="0 0 32 32">
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000" />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000" />
          </svg>
          </div>
            <span className='flex items-center text-sm font-medium'>Drag & drop or <a href='#'> browser files</a></span>
    </div>
  )
}

export default UploadButton