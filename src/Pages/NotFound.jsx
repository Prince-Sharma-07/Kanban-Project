import React from 'react'
import { useLocation } from 'react-router'

export default function NotFound() {
    const path = useLocation()
    console.log("Here the the object recieved by useLocation: ",path)
    return (
        <div className='h-screen w-screen flex flex-col gap-6 justify-center items-center bg-gray-300 text-red-400 p-4 text-6xl '>
            <div>Page Not Found 404 </div>
            <code className='flex leading-20'>{location.origin}<br/>{path.pathname}</code>
        </div>
    )
}
