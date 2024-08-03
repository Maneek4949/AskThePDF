import React, { useEffect, useState, ChangeEvent, DragEvent, useRef } from "react";

const DragNdrop: React.FC = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (event: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      // Handle dropped files
      console.log(droppedFiles);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      // Handle selected files
      console.log(selectedFiles);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <form className="bg-white p-1.5 h-12 flex rounded-xl border-dashed border-2 border-blue-200" id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input className="hidden" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active flex" : "flex"}>
      <span className='bg-slate-300 p-1 mr-2 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-800" viewBox="0 0 32 32">
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000" />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000" />
          </svg>
          </span>
            <span className='items-center text-sm font-medium flex'>Drag & drop or &nbsp;<p className="text-blue-700"> browser files</p></span>
      </label>
      {dragActive && (
        <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
      )}
    </form>
    
  );
};

export default DragNdrop;
