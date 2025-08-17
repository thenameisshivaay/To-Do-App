import React from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios';

function Create() {
  const [task,setTask]=useState()
  const submitHandler=(()=>{
    axios.post('http://localhost:3001/add', {task:task})
    .then((res)=>{
      location.reload();
      console.log(res)
    })
    .catch(err=> console.log(err))

  })
  return (
    <div className="create_form">
      <input 
      type='text' placeholder='Enter Task' onChange= {(e) => setTask(e.target.value)}id=""/>
      <button  onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Create
