"use client"

import React, { useRef } from 'react'
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

const Question = () => {
    const editorRef = useRef(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof QuestionSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                                <FormMessage />
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
                                <FormDescription className='body-regular text-light-500 mt-2.5'>
                                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                                </FormDescription>
                                <FormMessage />
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
                                    <Input className='no-focus light-border-2 background-light900_dark300 min-h-[56px] rounded-l border' placeholder="" {...field} />
                                </FormControl>
                                <FormDescription className='subtle-regular text-light-500 mt-2.5'>
                                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button className='primary-gradient min-h-[46px] self-end px-4 py-3 text-light-900 mt-8' type="submit">Ask A Question</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
    }

export default Question