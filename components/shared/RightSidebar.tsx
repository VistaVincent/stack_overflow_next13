import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RenderTag from './RenderTag'

const topQuestions = [
    { _id: 1, title: "How do i use Express as a custom server in next.js? "},
    { _id: 2, title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?"},
    { _id: 3, title: "Is it only me or the font is bolder than necessary?"},
    { _id: 4, title: "Redux Toolkit Not Updating State as Expected"},
    { _id: 5, title: "Async/Await Function Not Handling Errors Properly"},
    { _id: 6, title: "How do i use Express as a custom server in next.js? "},        
]

const popularTags = [
    { _id: 1, title: "Next" , totalQuestions: 2},
    { _id: 2, title: "React" , totalQuestions: 2},
    { _id: 3, title: "Tailwind" , totalQuestions: 2},
    { _id: 4, title: "CSS" , totalQuestions: 2},
    { _id: 5, title: "Shad Cn" , totalQuestions: 2},
    { _id: 6, title: "HTML" , totalQuestions: 2},        
]

const RightSidebar = () => {
    
  return (
    <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {topQuestions.map((question) => (
                    <Link 
                        href={`/questions/${question._id}`}
                        key={question._id}
                        className='flex cursor-pointer items-center justify-between gap-7'>
                            <p className='body-medium text-dark300_light700'>{question.title}</p>
                            <Image
                                src='/assets/icons/chevron-right.svg'
                                alt='arrow'
                                width ={20}
                                height={20} 
                                className='invert-colors'/>

                    </Link>
                        
                ))}
            </div>
        </div>
        <div className='mt-16 flex w-full flex-col gap-6'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
            {popularTags.map((tag) => (
                <RenderTag key={tag._id}  _id= {tag._id} name = {tag.title} totalQuestions = {tag.totalQuestions} showCount = {true}/>
            ))}
        </div>

    </section>
  )
}

export default RightSidebar