'use client'

import React from 'react'
import { useTheme } from 'next-themes'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import Image from 'next/image'
import { themes } from '@/constants'


const Theme = () => {
    const { theme, setTheme } = useTheme();
  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
        <MenubarMenu>
            <MenubarTrigger className=''>
                {theme === 'light'? (
                    <Image src='/assets/icons/sun.svg'
                    alt='sun'
                    width={20}
                    height={20}
                    className='active-theme'/>
                ): (
                    <Image src='/assets/icons/moon.svg'
                    alt='moon'
                    width={20}
                    height={20}
                    className='active-theme'/>
                )}
            </MenubarTrigger>
            <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[50px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300'>
                {themes.map((item) => {
                    return <MenubarItem 
                                key={item.label} 
                                onClick={()=> setTheme(item.value)}
                                className='flex items-center gap-4 px-2.5 py-2'>
                        <Image
                            src = {item.icon}
                            alt={item.value}
                            width={16}
                            height={16}
                            className={theme === item.value ? 'active-theme' : '' }/>
                        
                    </MenubarItem>
                })}
            </MenubarContent>
        </MenubarMenu>
    </Menubar>

  )
}

export default Theme