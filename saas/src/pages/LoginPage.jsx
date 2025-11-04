import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-white">
      <div className="glass p-6">
        <h1 className="text-xl font-semibold mb-4">Welcome back</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none"/>
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none"/>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-accent text-black font-medium">{loading? 'Signing in...' : 'Sign in'}</button>
        </form>
        <div className="text-sm text-white/70 mt-3">New here? <a href="/signup" className="text-accent">Create an account</a></div>
      </div>
    </div>
  )
}
