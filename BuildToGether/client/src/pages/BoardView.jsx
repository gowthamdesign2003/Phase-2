import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import socket from '../services/socket'
import KanbanBoard from '../components/Kanban/KanbanBoard'

export default function BoardView(){
  const { id } = useParams()
  const [board,setBoard] = useState(null)
  const [tasks,setTasks] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const { data } = await API.get(`/board/${id}`)
        if (!mounted) return
        setBoard(data.board)
        setTasks(data.tasks)
      }catch(err){
        console.error(err)
      }finally{
        if (mounted) setLoading(false)
      }
    }
    load()

    // join socket room
    socket.emit('join-board', id)

    socket.on('task-updated', payload => {
      if (!payload) return
      if (payload.action === 'add') {
        setTasks(prev => {
          // avoid duplicates
          if (prev.find(p => p._id === payload.task._id)) return prev
          return [...prev, payload.task]
        })
      } else if (payload.action === 'update') {
        setTasks(prev => prev.map(t => t._id === payload.task._id ? payload.task : t))
      }
    })

    socket.on('comment-added', comment => {
      // could show toast or append to task comments.
      console.log('comment added', comment)
    })

    return ()=>{
      mounted = false
      socket.emit('leave-board', id)
      socket.off('task-updated')
      socket.off('comment-added')
    }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!board) return <div>Board not found</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{board.title}</h1>
      <p className="text-gray-600 mb-6">{board.description}</p>

      <KanbanBoard boardId={id} tasks={tasks} setTasks={setTasks} />
    </div>
  )
}
