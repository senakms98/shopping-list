import React from 'react'
import { FaTrash } from "react-icons/fa";

const IconButton = () => {
  return (
    <div
    style={{
        width:32,
        height: 32,
        margin: '0px auto',
        backgroundColor: "rgba(255, 0, 0, 0.2)"
    }}
    className='rounded-circle'
    >
    <FaTrash color='var(--bs-danger)' /></div>
  )
}

export default IconButton