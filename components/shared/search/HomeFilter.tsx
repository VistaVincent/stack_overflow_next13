import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { Filter } from './Filter'
import { HomePageFilters } from '@/constants/filters'
import HomePageFilter from '@/components/Home/HomePageFilter'

const HomeFilter = () => {
  return (
    <div className='flex max-sm:flex-col md:flex-col mt-[44px] gap-4'>
        <div className='background-light800_dark300  flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
              <Image
                  src='/assets/icons/search.svg'
                  alt='search'
                  width={24}
                  height={24}
                  className='cursor-pointer'/>
              <Input 
                  type='text'
                  placeholder='Search questions...'
                  value = ''
                  className='paragraph-regular no-focus placeholder background-light800_dark300 border-none shadow-none outline-none'/>
        </div>
        <Filter 
            filters={HomePageFilters}
            otherClasses={'min-h-[56px] sm:min-w-[170px]'}
            containerClasses={'md:hidden '}/>

        <HomePageFilter 
            filters={HomePageFilters}
            containerClasses={'max-md:hidden mt-7'}/>

    </div>
  )
}

export default HomeFilter