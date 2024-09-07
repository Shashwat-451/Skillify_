import React, { useEffect, useState } from "react"
import axios from "axios"

import CourseCard from "../components/core/Catalog/CourseCard.jsx"

export default function AllCourses() {
  const [allCourses, setAllCourses] = useState([])
  const [filterByTag,setFilterByTag]=useState('All')
  const[search,setSearch]=useState('')

  useEffect(() => {
    
    axios({
      url: "http://localhost:4000/api/v1/course/getAllCourses",
      method: "GET",
    })
      .then((response) => {
        console.log("all courses", response.data) // Log the response data
        setAllCourses(response.data.data) // Ensure this is an array
        
      })
      .catch((error) => {
        console.error("Error fetching courses:", error)
      })
  }, [])
  
   const handleChange=(event)=>{
       setFilterByTag(event.target.value);
   }

   const handleSearch=(event)=>{
    setSearch(event.target.value);
   }
   const displayCourses=allCourses.filter((course)=>{
    return course.courseName.toLowerCase().includes(search.toLowerCase())
 })
  return (
    <>
    <div>
    <select onChange={handleChange}>
            <option  value={"All"}>Filter By Tag</option>
            <option  value={"Web Development"}>Web Development</option>
            <option value={"Blockchain"}>Blockchain</option>
            <option value={"Machine Learning"}>Machine Learning</option>
            <option value={"Data Structures And Algorithms"}>Data Structures and Algorithms</option>
            <option value={"Cloud Computing"}>Cloud Computing</option>
        </select>

        <input name="search" value={search} onChange={handleSearch} placeholder="Search Course"/>

    </div>
     
            {console.log(filterByTag)}
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
        
       
    
      {filterByTag==='All' && Array.isArray(allCourses) ? (
        displayCourses.map((course) => (
            <div style={{width:"500px",height:"500px",margin:"10px"}}>
          <CourseCard key={course.id} course={course} Height="h-[550px]" />
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
      {
        filterByTag!=='' && Array.isArray(displayCourses) ? (
            displayCourses.map((course) => ( course.category.name===filterByTag &&
                <div style={{width:"500px",height:"500px",margin:"10px"}}>
              <CourseCard key={course.id} course={course} Height="h-[550px]" />
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )
      }
   
    </div>
    </>
    
  )
}
