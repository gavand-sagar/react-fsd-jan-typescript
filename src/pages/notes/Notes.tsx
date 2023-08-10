import React, { useState } from 'react'
import AddNote from './AddNote'
import ListNote from './ListNote'
import Header from '../../shared/components/Header'

export default function Notes() {
  
  let name = "Mike";

  function update(){
    name = "Tom"
  }

  return (
    <>
      {name}
      
      <button onClick={update}>Click</button>
    </>
  )
}
