import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getMicroscopesById } from "../../modules/MicroscopeManager";


export const MicroscopeDetail = () => {

    const {scopeId} =useParams();

    const [scope, setScope] = useState({
        make: "",
        model: "",
        userId: '',
        user :{
            firstName: '',
            lastName: "",
            fullName: ""
        }
    });

    useEffect(()=>{
        getMicroscopesById(scopeId).then(setScope)
    },[])
    return(
        <>

           
            {console.log(scope)}
            <div className="scope-details-container">
            <h1>{scope.make} {scope.model}</h1>
            <h5>{scope.user.fullName}</h5>
            </div>
           

        </>
    )
}