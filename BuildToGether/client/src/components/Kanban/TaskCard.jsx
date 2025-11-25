import React from 'react'

export default function TaskCard({ task, onMove }){
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{task.title}</div>
          {task.description && <div className="text-xs text-gray-500">{task.description}</div>}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {task.status !== 'To Do' && <button onClick={()=>onMove(task._id, 'To Do')} className="text-sm py-1 px-2 border rounded">To Do</button>}
        {task.status !== 'In Progress' && <button onClick={()=>onMove(task._id, 'In Progress')} className="text-sm py-1 px-2 border rounded">In Progress</button>}
        {task.status !== 'Done' && <button onClick={()=>onMove(task._id, 'Done')} className="text-sm py-1 px-2 border rounded">Done</button>}
      </div>
    </div>
  )
}
