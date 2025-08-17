import React, { useState } from 'react'
import Create from './Create'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from "react-icons/bs";

function Home() {
    const[todos,setTodos] =useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then((res)=>{
        setTodos(res.data)
      }).catch(err =>console.log(err))
    },[])

    const handleEdit= (id)=>{
       axios.put('http://localhost:3001/update/' +id)
      .then((res)=>{
        location.reload();
        console.log(result)
      }).catch(err =>console.log(err))

    }

    const handleDelete = (id) =>{
      axios.delete('http://localhost:3001/delete/' +id)
      .then((res)=>{
        location.reload();
        console.log(result)
      }).catch(err =>console.log(err))

    }
  return (
    <div className="home">
       <h2>TODO LIST</h2>
       <Create/>
       {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => (
          <div className='task' key={todo._id}>
            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
              {todo.done ?<BsFillCheckCircleFill className="icon"/>:
              <BsCircleFill className="icon" />}
              <p className={todo.done ? "line_throw": " "}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className="icon" onClick={()=>handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home
