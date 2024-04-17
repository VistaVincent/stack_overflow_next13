import { Button } from "@/components/ui/button"
import Link from "next/link"
import LocalSearch from "@/components/shared/search/LocalSearch"
import { Filter } from "@/components/shared/search/Filter"
import HomePageFilter from "@/components/Home/HomePageFilter"
import { HomePageFilters } from "@/constants/filters"
import QuestionCardComp from "@/components/shared/Question/QuestionCardComp"
import NoResutsFound from "@/components/shared/NoResutsFound"
import { getQuestions } from "@/lib/actions/question.actions"


const Home = async () => {

  const result = await getQuestions({});
  console.log("result is",result);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="self-end" href= "/ask-question">
          <Button className="primary-gradient min-h-[46px] self-start px-4 py-3 text-light-900">Ask a Question</Button>
        </Link>
      </div>
      <div className='mt-[44px] flex gap-4 max-sm:flex-col md:flex-col'>
        <LocalSearch 
          placeholder='Search Questions...'/>
        <Filter 
            filters={HomePageFilters}
            otherClasses={'min-h-[56px] sm:min-w-[170px]'}
            containerClasses={'md:hidden '}/>

        <HomePageFilter 
            filters={HomePageFilters}
            containerClasses={'max-md:hidden mt-7'}/>
      </div>
      <div className="mt-8 flex flex-col gap-6 ">
          {result && result.questions.length > 0 ?
            (result.questions.map((question)=>(
            <QuestionCardComp 
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              />
            )))
            :(<>
                <NoResutsFound/>
              </>
            )}
            
      </div>
        
      

    </>
  )
}

export default Home