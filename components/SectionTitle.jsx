import React from 'react'

const SectionTitle = ({text}) => {
  return (
    <div className='w-full flex items-center py-2'>
        <h3 className='text-lg ' style={{fontFamily : "Supercell Magic"}}>
            {text}
        </h3>
    </div>
  )
}

export default SectionTitle