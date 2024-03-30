import { QuestionCard } from '@/types'
import Link from 'next/link'
import React from 'react'
import RenderTag from '../RenderTag'
import Image from 'next/image'

const QuestionCardComp = ({questionDetails}:{questionDetails:QuestionCard}) => {
  return (
    <div className='background-light900_dark200 min-h-[200px] rounded-xl shadow-light-300 dark:shadow-none p-[40px]'>
        <Link 
            href={`/questions/${questionDetails._id}`}>
                <p className='subtle-regular text-dark400_light700'>{questionDetails.days} days ago</p>
                <h3 className='h3-semibold mt-1'>{questionDetails.title}</h3>
        </Link>
        <div className='flex gap-2 mt-4'>
            {questionDetails.tags.map((item) => (
                <RenderTag _id={item._id} name={item.name} key={item._id}/>
            ))}
        </div>
        <div className='flex flex-wrap justify-between mt-6'>
            <Link href='/profile/' className='flex-center gap-1'>
                <Image 
                    src={'/assets/icons/user.svg'}
                    width={16}
                    height={16}
                    alt='User image'
                    className='rounded-lg'/>
                <p className='body-medium text-dark400_light700 '>{questionDetails.Author}</p>
                
            </Link>
            <div className='flex justify-between gap-4'>
                <div className='flex-center flex-wrap gap-1'>
                   <Image 
                        src={'/assets/icons/like.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{questionDetails.votes}</span> Votes
                    </p>
                </div>
                <div className='flex-center flex-wrap gap-1'>
                   <Image 
                        src={'/assets/icons/message.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{questionDetails.votes}</span> Votes
                    </p>
                </div>
                <div className='flex-center flex-wrap gap-1'>
                   <Image 
                        src={'/assets/icons/eye.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{questionDetails.votes}</span> Votes
                    </p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default QuestionCardComp