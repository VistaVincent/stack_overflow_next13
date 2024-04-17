"use client"

import React, { useRef, useState } from 'react'
import { QuestionSchema } from '@/lib/validations'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Editor } from '@tinymce/tinymce-react';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { createQuestion } from '@/lib/actions/question.actions'
import { useRouter, usePathname } from 'next/navigation'

const type:any = 'create';

const Question = ({mongoUserId}:{mongoUserId:string}) => {
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags:[],
          },
    })

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>,field: any) => {
        console.log(e);
        console.log(field);
        if(e.key === 'Enter' && field.name === 'tags'){
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            if(tagValue !== ''){
                if(tagValue.length > 15){
                    return form.setError('tags', {
                        type:'required',
                        message: 'Tag must be less than 15 characters.'
                    })
                }

                if(!field.value.includes(tagValue as never)){
                    form.setValue('tags', [...field.value, tagValue]);
                    tagInput.value = '';
                    form.clearErrors('tags');
                }              
            }else {
                form.trigger();
            }
        }
    }

    const handleTagRemove = (tag:string, field: any) =>{
        const newTags = field.value.filter((t:string) => (t !== tag));

        form.setValue('tags', newTags);

    } 
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof QuestionSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsSubmitting(true);

        try{
            // make async call to your API
            await createQuestion({
                title: values.title,
                content: values.explanation,
                tags: values.tags,
                author: JSON.parse(mongoUserId),
                path: pathName,
            });

            router.push('/');

        }catch(error) {
            console.log(error);
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <div className='flex flex-col '>
            <h2 className='h1-bold '>Ask a public question</h2>
            <div className='mt-10 flex flex-col justify-between'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='flex w-full flex-col'>
                                <FormLabel className='base-bold  text-dark100_light900'>Question Title<span className='ml-1 text-primary-500'>*</span></FormLabel>
                                <FormControl className='mt-3'>
                                    <Input className='no-focus light-border-2 background-light900_dark300 min-h-[56px] rounded-l border' placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className='body-regular text-light-500 mt-2.5'>
                                Be specific and imagine you’re asking a question to another person.
                                </FormDescription>
                                <FormMessage className='text-red-500' />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="explanation"
                        render={({ field }) => (
                            <FormItem className='flex w-full flex-col'>
                                <FormLabel className='base-bold  text-dark100_light900'>Detailed explanation of your problem?<span className='ml-1 text-primary-500'>*</span></FormLabel>
                                <FormControl className='mt-3'>
                                    <Editor 
                                        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                        onInit={(evt, editor) => {
                                            // @ts-ignore
                                            editorRef.current = editor
                                        }}
                                        initialValue=""
                                        onBlur={field.onBlur}
                                        onEditorChange={(content) => field.onChange(content)}
                                        init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "codesample", "fullscreen", "insertdatetime", "media", "table"
                                        ],
                                        toolbar: 'undo redo |' +
                                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist',
                                        content_style: 'body { font-family:Inter; font-size:16px }'
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className='body-regular mt-2.5 text-light-500'>
                                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                                </FormDescription>
                                <FormMessage className='text-red-500' />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem className='flex w-full flex-col'>
                                <FormLabel className='base-bold  text-dark100_light900'>Tags<span className='ml-1 text-primary-500'>*</span></FormLabel>
                                <FormControl className='mt-3'>
                                    <>
                                        <Input className='no-focus light-border-2 background-light900_dark300 min-h-[56px] rounded-l border' placeholder="Add tags..."  
                                        onKeyDown={(e) => handleInputKeyDown(e,field)}
                                        />
                                        {field.value.length > 0 && (
                                            <div className='flex justify-start mt-2.5 gap-1'>
                                                {field.value.map((tag) => (
                                                    <Badge key={tag} className='background-light800_dark300 text-light400_light500  rounded-md flex items-center justify-center capitalize' onClick={() => handleTagRemove(tag,field)}>
                                                        {tag}
                                                        <Image 
                                                            src = '/assets/icons/close.svg'
                                                            alt ='close'
                                                            width={12} 
                                                            height={12}
                                                            className='cursor-pointer object-contain invert-0 dark:invert ml-1'/>
                                                    </Badge>
                                                ))}
                                            </div>)}
                                        </>
                                </FormControl>
                                <FormDescription className='subtle-regular text-light-500 mt-2.5'>
                                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                                </FormDescription>
                                <FormMessage className='text-red-500' />
                            </FormItem>
                        )}
                        />
                        <Button className='primary-gradient mt-8 min-h-[46px] self-end px-4 py-3 text-light-900' type="submit" disabled={isSubmitting} >
                            {isSubmitting ? (
                                <>
                                { type === 'edit' ? 'Editting...' : 'Posting...'}
                                </>
                            )
                            :(
                                <>
                                { type === 'edit' ? 'Edit' : 'Post Question'}
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
    }

export default Question