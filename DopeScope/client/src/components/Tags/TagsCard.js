import React from "react"

import "./Tags.css"

export const TagCard = (props) => {
    return (
        <>
            <div onClick={props.handleTagClick}>{props.tag.tagName}</div>
        </>
    )
}