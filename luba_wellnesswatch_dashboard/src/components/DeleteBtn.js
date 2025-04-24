import React from 'react'
import { FaTrash } from 'react-icons/fa6'

const DeleteBtn = () => {
  return (
    <button
      aria-label="Delete Item"
      className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-red-600 rounded-lg shadow-md hover:bg-slate-400 hover:text-red-800 transition"
    >
      <FaTrash size={20} />
      Delete
    </button>
  )
}

export default DeleteBtn
