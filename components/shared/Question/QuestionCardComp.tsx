import Link from 'next/link'
import React from 'react'
import RenderTag from '../RenderTag'
import Image from 'next/image'
import { ITag } from '@/database/tag.model'
import { IUser } from '@/database/user.model'

interface Props{
    _id: string;
    title: string;
    tags: ITag[];
    author: IUser;
    upvotes: string;
    imagePath:string;
    views: string;
    answers: string;
    createdAt: string;}

const QuestionCardComp = ({ _id,title,tags,author,upvotes,views,answers,imagePath,createdAt }: Props) => {
  return (
    <div className='background-light900_dark200 min-h-[200px] rounded-xl p-[40px] shadow-light-300 dark:shadow-none'>
        <Link 
            href={`/questions/${_id}`}>
                <p className='subtle-regular text-dark400_light700 sm:hidden'>{2} days ago</p>
                <h3 className='sm:h3-semibold base-semibold text-dark400_light700 line-clamp-1'>{title}</h3>
        </Link>
        <div className='mt-4 flex gap-2'>
            {tags.map((item) => (
                <RenderTag _id={item._id} name={item.name} key={item._id}/>
            ))}
        </div>
        <div className='mt-6 flex w-full flex-wrap items-center justify-between gap-3'>
            <Link href='/profile/' className='flex-center gap-1'>
                <Image 
                    src={`${(!imagePath) ? '/assets/icons/user.svg':`${imagePath}`}`}
                    width={16}    
                    height={16}
                    alt='User image'
                    className='invert-colors rounded-lg'/>
                <p className='body-medium text-dark400_light700'>{author?.name}</p>
                <span className='small-regular text-dark400_light700 line-clamp-1 max-sm:hidden'>• asked {2} ago</span>
            </Link>
            <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
                <div className='flex-center flex-wrap items-center gap-1'>
                   <Image 
                        src={'/assets/icons/like.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{upvotes}</span> Votes
                    </p>
                </div>
                <div className='flex-center flex-wrap items-center gap-1'>
                   <Image 
                        src={'/assets/icons/message.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{answers}</span> Votes
                    </p>
                </div>
                <div className='flex-center flex-wrap items-center gap-1'>
                   <Image 
                        src={'/assets/icons/eye.svg'}
                        width={16}
                        height={16}
                        alt='like'/> 
                    <p className='small-medium text-dark400_light800' >
                        <span className='small-medium'>{views}</span> Votes
                    </p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default QuestionCardComp