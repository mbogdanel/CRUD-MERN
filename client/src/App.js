import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/read/').then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    axios.post('http://localhost:3001/insert/', {
      foodName: foodName,
      days: days,
    })
  }

  const updateFood = (id) => {
    axios.put('http://localhost:3001/update', {
      id: id,
      newFoodName: newFoodName,
    })
  }

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
  }

  return (
    <div className='App'>
      <h1>Crud App with MERN</h1>

      <label>Food Name:</label>
      <input
        type='text'
        onChange={(e) => {
          setFoodName(e.target.value)
        }}
      />
      <label>Days Since You Ate It:</label>
      <input
        type='number'
        onChange={(e) => {
          setDays(e.target.value)
        }}
      />
      <button onClick={addToList}>Add To List</button>

      <h1>Food List </h1>

      {foodList.map((val, key) => {
        return (
          <div key={key} className='food'>
            <h2>{val.foodName}</h2>
            <h2>{val.daysSinceIAte}</h2>
            <input
              type='text'
              placeholder='new food'
              onChange={(e) => {
                setNewFoodName(e.target.value)
              }}
            />
            <button onClick={() => updateFood(val._id)}>update</button>
            <button onClick={() => deleteFood(val._id)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default App
