import { useEffect } from "react"


export const useEvent = (event,handler, passive = false)=>{
    useEffect(()=>{
        window.addEventListener(event,handler,passive)

        return function cleanUp(){
            window.removeEventListener(event,handler)
        }
    })
}

export const color = (num)=>{
    switch(num){
        case 2:
            return "#EEE4DA"
        case 4:
            return "#EEE1C9"
        case 8:
            return "#F3B27A"
        case 16:
            return "#F69664"
        case 32:
            return "#F77C5F"
        case 64:
            return "#F75F3B"
        case 128:
            return "#EDD073"
        case 256:
            return "#E8C350"
        case 512:
            return "#E8BE40"
        case 1024:
            return "#E8BB31"
        case 2048:
            return "#E7B723"
        default:
            return "#CDC1B4"
    }
}