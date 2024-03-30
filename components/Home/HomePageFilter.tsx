'use client'

import React from 'react'
import { Button } from '../ui/button'

interface Props{
    filters:{
        name:string,
        value:string
    }[],
    containerClasses:string
}
const HomePageFilter = ({filters,containerClasses}:Props) => {
    const active = ''
  return (
    <div className={`${containerClasses} flex gap-4`}>
        {filters.map((item)=>(
            <Button key={item.value} 
                    onClick={()=>{}}
                    className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value 
                        ? 'bg-primary-100 text-primary-500 dark:bg-dark-300'
                        : 'bg-light-800 text-light-500 dark:bg-dark-300' }`}>
                {item.name}
            </Button>
        ))}
    </div>
  )
}

export default HomePageFilter