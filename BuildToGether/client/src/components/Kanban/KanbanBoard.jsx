import React, { useState } from 'react'
import TaskCard from './TaskCard'
import API from '../../services/api'

const STATUSES = ['To Do','In Progress','Done']

export default function KanbanBoard({ boardId, tasks, setTasks }){
  const [newTitle, setNewTitle] = useState('')
  const [adding, setAdding] = useState(false)

  const addTask = async () => {
    if (!newTitle) return
    setAdding(true)
    try{
      const { data } = await API.post('/task/add', { boardId, title: newTitle })
      setTasks(prev=>[...prev, data])
      setNewTitle('')
    }catch(err){
      alert(err.response?.data?.message || 'Could not add task')
    }finally{
      setAdding(false)
    }
  }

  const updateStatus = async (taskId, status) => {
    try{
      const { data } = await API.post('/task/update-status', { taskId, status })
      setTasks(prev => prev.map(t => t._id === data._id ? data : t))
    }catch(err){
      alert(err.response?.data?.message || 'Could not update status')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {STATUSES.map(status => (
        <div key={status} className="bg-gray-100 p-4 rounded min-h-[200px]">
          <h3 className="font-semibold mb-3">{status}</h3>
          <div className="space-y-2">
            {tasks.filter(t=>t.status === status).map(t => (
              <TaskCard key={t._id} task={t} onMove={updateStatus} />
            ))}
          </div>

          {status === 'To Do' && (
            <div className="mt-4">
              <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="New task title" className="w-full p-2 border mb-2 rounded" />
              <button disabled={adding} onClick={addTask} className="w-full py-2 bg-blue-600 text-white rounded">
                {adding ? 'Adding...' : 'Add'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
