import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PublicBoards from './pages/PublicBoards'
import BoardView from './pages/BoardView'
import Dashboard from './pages/Dashboard'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'

function Header(){
  const user = JSON.parse(localStorage.getItem('bt_user') || 'null')

  const logout = () => {
    localStorage.removeItem('bt_token')
    localStorage.removeItem('bt_user')
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">BuildTogether</Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Explore</Link>
          <Link to="/dashboard" className="hover:underline">My Boards</Link>
          {user ? (
            <>
              <span className="text-sm mr-2">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm bg-red-500 text-white py-1 px-3 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<PublicBoards/>} />
          <Route path="/board/:id" element={<BoardView/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </main>
    </div>
  )
}
