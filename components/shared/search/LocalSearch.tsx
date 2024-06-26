import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const LocalSearch = ({placeholder}:{placeholder:string}) => {
  return (
    <div className='background-light800_dark300  flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
              <Image
                  src='/assets/icons/search.svg'
                  alt='search'
                  width={24}
                  height={24}
                  className='cursor-pointer'/>
              <Input 
                  type='text'
                  placeholder={placeholder}
                  className='paragraph-regular no-focus placeholder background-light800_dark300 border-none shadow-none outline-none'/>
        </div>
  )
}

export default LocalSearch