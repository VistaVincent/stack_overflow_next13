import Question from '@/components/shared/forms/Question';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const AskQuestion = async () => {

  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({userId});

  return (
    <>
    <div>
      <div>
        <Question mongoUserId = {JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
    </>
    
  )
}

export default AskQuestion