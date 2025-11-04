import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { storage, db } from '../firebase.js'
import { ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy } from 'firebase/firestore'

export default function DashboardPage() {
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])

  const onUpload = async () => {
    if (!file || !user) return
    try {
      setUploading(true)
      const path = `uploads/${user.uid}/${file.name}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      await addDoc(collection(db, 'files'), {
        fileName: file.name,
        storagePath: path,
        uploadedAt: serverTimestamp(),
        userID: user.uid
      })
      setFile(null)
      alert('Uploaded!')
    } catch (e) {
      console.error(e)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'files'), where('userID', '==', user.uid), orderBy('uploadedAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setFiles(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [user])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white grid md:grid-cols-[220px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="hidden md:block">
        <div className="glass p-4 sticky top-20">
          <div className="font-semibold mb-2">Navigation</div>
          <nav className="text-sm space-y-1">
            <a href="/dashboard" className="block px-3 py-1 rounded hover:bg-white/10">Dashboard</a>
            <a href="#data" className="block px-3 py-1 rounded hover:bg-white/10">Data Hub</a>
            <a href="#settings" className="block px-3 py-1 rounded hover:bg-white/10">Settings</a>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main>
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.email}!</h1>

        <section className="glass p-5 mb-6">
          <h2 className="font-medium mb-3">Upload Your Data</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} className="text-sm"/>
            <button onClick={onUpload} disabled={!file || uploading} className="px-4 py-2 rounded-md bg-accent text-black text-sm font-medium">
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </section>

        <section className="glass p-5">
          <h2 className="font-medium mb-3">Your Files</h2>
          {files.length === 0 ? (
            <div className="text-white/70 text-sm">No files yet.</div>
          ) : (
            <ul className="text-sm divide-y divide-white/10">
              {files.map(f => (
                <li key={f.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{f.fileName}</div>
                    <div className="text-white/60">{f.storagePath}</div>
                  </div>
                  <div className="text-white/60">{f.uploadedAt?.toDate ? f.uploadedAt.toDate().toLocaleString() : 'Pending'}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
