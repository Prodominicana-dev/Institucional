"use client";
import Link from 'next/link'
import React from 'react'
import { LinkIcon } from '@heroicons/react/24/solid'

export default function SidebarLink({title, link, openNewPage = true}: {title: string, link: string, openNewPage?: boolean}) {
  return (
    <>
    {openNewPage ? (
        <Link href={link} target='_blank' className='w-11/12 h-14 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg px-5'>
        <h1 className='text-white font-montserrat text-lg font-semibold'>{title}</h1>
        {/* <LinkIcon className='size-6 text-white' /> */}
    </Link>
    ) : (
        <Link href={link} className='w-11/12 h-14 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg px-5'>
        <h1 className='text-white font-montserrat text-lg font-semibold'>{title}</h1>
        {/* <LinkIcon className='size-6 text-white' /> */}
    </Link>
    )}
    </>
  )
}
