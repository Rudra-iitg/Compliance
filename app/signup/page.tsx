"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) router.replace("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    try {
      setLoading(true);
      // Create the auth account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user's profile with their display name
      await updateProfile(user, { displayName: name });
      
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="glass max-w-md w-full">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="John Doe"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters"/>
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required/>
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400" disabled={loading}>{loading?"Creating...":"Sign up"}</Button>
          </form>
          <div className="text-sm text-slate-300/80 mt-3">Already have an account? <a href="/login" className="text-teal-300">Log in</a></div>
        </CardContent>
      </Card>
    </div>
  );
}
