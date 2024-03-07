import React from 'react'

export default function page({ params }: { params: { sectionId: string, subsectionId: string } }) {
  return (
    <div className='min-h-[80vh] w-full bg-white'>{params.sectionId} - {params.subsectionId}</div>
  )
}
