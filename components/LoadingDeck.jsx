import React from 'react'
import { Skeleton } from './ui/skeleton'

const LoadingDeck = () => {
  return (
    <div className='w-full grid grid-cols-4'>
        {Array(8).map((item , index) => (
            <Skeleton key={index} className="w-full h-100" />
        ))}
    </div>
  )
}

export default LoadingDeck