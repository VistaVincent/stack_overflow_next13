import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


   
  interface Props{
    filters:{
      name:string,
      value:string
    }[],
    otherClasses:string,
    containerClasses:string
  }
  export function Filter({filters,otherClasses,containerClasses}:Props) {
    return (
      <div className={`${containerClasses}`}>
        <Select>
          <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
            <SelectValue placeholder="Select A Filter" />
          </SelectTrigger>
          <SelectContent className="background-light800_dark300 border-none">
            <SelectGroup>
              {filters.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>    
      </div>
    )
  }