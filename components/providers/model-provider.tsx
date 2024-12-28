"use client"

import { useEffect, useState } from "react"

export const ModalProvider=()=>{
    const [isMounted, serIsMounted]= useState(false);

    useEffect(()=>{
        serIsMounted(true)
    },[]);

    if(!isMounted)
        return null;

    return(
        <>
          
        </>
    )
}