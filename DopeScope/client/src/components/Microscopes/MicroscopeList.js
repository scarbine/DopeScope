import { getAllByAltText } from "@testing-library/dom";
import React, { useEffect, useState } from "react";
import { getAllMicroscopes } from "../../modules/MicroscopeManager";
import { MicroscopeCard } from "./MicroscopeCard";


export const MicroscopeList = () => {
    
    const [microscopes, setMicroscopes] = useState([]);

    useEffect(()=>{
        getAllMicroscopes().then(setMicroscopes)
    },[])

    return (
        <>
        <h1>Microscope List</h1>
        {microscopes.map(microscope =>{
            <MicroscopeCard key={microscope.id} microscope={microscope} />
        })}

        </>
    )
}