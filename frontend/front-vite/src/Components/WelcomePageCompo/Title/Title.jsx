import React from 'react'
import './Title.css'

function Title({title , subTitle}) {
  return (
    <div className='title container'>
      <p>{title}</p>
      <h2>{subTitle}</h2>
    </div>
  )
}

export default Title
