import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function PublicBoards(){
  const [boards,setBoards] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    API.get('/board/public')
      .then(r => setBoards(r.data))
      .catch(()=>{})
      .finally(()=>setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore public boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map(b=> (
          <div key={b._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{b.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-xs text-gray-500">Owner: {b.owner?.name || '—'}</div>
              <Link to={`/board/${b._id}`} className="text-blue-600">Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
