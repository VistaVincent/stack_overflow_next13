import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import HomeFilter from "@/components/shared/search/HomeFilter"

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse gap-4 justify-between sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="self-end" href= "/ask-question">
          <Button className="primary-gradient self-start min-h-[46px] px-4 py-3 text-light-900">Ask a Question</Button>
        </Link>
      </div>
      <HomeFilter/>
        
      

    </>
  )
}

export default Home