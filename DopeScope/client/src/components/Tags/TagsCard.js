import React from "react"
import { useEffect, useState } from "react/cjs/react.development"

import "./Tags.css"

export const TagCard = (props) => {

    const [isActive, setIsActive] = useState(false)

    useEffect(()=>{
       
     setIsActive(props.isActive)

    },[])

    const handleInactiveTagClick =()=>{
        
        setIsActive(!isActive)
    }
    const handleActiveTagClick =()=>{

        setIsActive(!isActive)
    }

    return (
        <>
        {console.log(props.tag.id, "is", isActive)}
           {isActive ? <div className={`tag-active-${isActive}`} onClick={handleActiveTagClick}>{props.tag.tagName}</div> : <div className={`tag-active-${isActive}`} onClick={handleInactiveTagClick}>{props.tag.tagName}</div> }
        </>
    )
}