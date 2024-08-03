import React from 'react'
import UploadButton from './UploadButton'
import FileTabButton from './FileTabButton'
import DragNdrop from './DragNDrop'

function SidebarMenu() {
  return (
    <aside className='bg-main h-screen  md:w-[260px] px-4'>
      <div>
        <h2>Chat with PDF </h2>
        <DragNdrop/>
        <hr></hr>
        <p>Documents</p>
        <FileTabButton/>
      </div>
    </aside>
  )
}

export default SidebarMenu