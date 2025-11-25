import React, { useState } from 'react'
import API from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    try{
      const { data } = await API.post('/auth/login',{ email, password })
      localStorage.setItem('bt_token', data.token)
      localStorage.setItem('bt_user', JSON.stringify(data.user))
      nav('/dashboard')
    }catch(err){
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-2 rounded" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border mb-4 rounded" />
      <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  )
}
