import React from 'react'
import Creater from './Creater'

export default function CreatersList({creaters}) {
    const creatersElm = creaters.map(creater => <Creater key={creater.id} {...creater}/>)
  return (
    <div className='creaters-list'>
        {creatersElm}
    </div>
  )
}
