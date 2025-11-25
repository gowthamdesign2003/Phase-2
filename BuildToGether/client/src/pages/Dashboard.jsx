import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [myBoards, setMyBoards] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('bt_user') || 'null')

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        // NOTE: server currently has GET /board/public and GET /board/:id.
        // In production add GET /board/mine. Here we fetch public boards and filter by owner for demo.
        const { data } = await API.get('/board/public')
        if (user) {
          setMyBoards(data.filter(b => b.owner && (b.owner._id === user.id || b.owner._id === user._id)))
        } else {
          setMyBoards([])
        }
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [user])

  const create = async () => {
    if (!title) return
    try{
      const { data } = await API.post('/board/create', { title, description: '', tags: [], isPublic: true })
      setMyBoards(prev=>[data, ...prev])
      setTitle('')
    }catch(err){
      alert(err.response?.data?.message || 'Please login first')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Boards</h2>

      <div className="mb-4 max-w-lg">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Board title" className="p-2 border mr-2 rounded w-full md:w-auto" />
        <button onClick={create} className="py-2 px-4 bg-green-600 text-white rounded mt-2 md:mt-0">Create</button>
      </div>

      {loading ? <div>Loading...</div> :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myBoards.length === 0 && <div className="text-gray-500">No boards yet.</div>}
          {myBoards.map(b=> (
            <div key={b._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{b.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-gray-500">Public</div>
                <Link to={`/board/${b._id}`} className="text-blue-500">Open</Link>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
