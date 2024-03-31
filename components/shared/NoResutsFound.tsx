'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const NoResutsFound = () => {
    const { theme } = useTheme();
    return (
        <div className='mt-10 flex flex-col items-center justify-center'>
            <Image 
                src={`/assets/images/${theme==='dark'?'dark-illustration.png':'light-illustration.png'}`}
                width={270}
                height={200}
                alt='no results available'/>
            <h2 className='h2-bold text-dark200_light900 mt-8'>There are no question to show</h2>
            <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡</p>
            <Link className="mt-6" href= "/ask-question">
                <Button className="primary-gradient min-h-[46px] self-start px-4 py-3 text-light-900">Ask a Question</Button>
            </Link>
            
        </div>
  )
}

export default NoResutsFound