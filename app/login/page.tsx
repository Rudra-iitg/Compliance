"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update last login timestamp in Firestore
      try {
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: serverTimestamp(),
        });
      } catch (dbErr) {
        console.error("Failed to update last login:", dbErr);
        // Continue anyway - login should still work
      }
      
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="glass max-w-md w-full">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/20 outline-none" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400" disabled={loading}>{loading?"Signing in...":"Sign in"}</Button>
          </form>
          <div className="text-sm text-slate-300/80 mt-3">New here? <a href="/signup" className="text-teal-300">Create an account</a></div>
        </CardContent>
      </Card>
    </div>
  );
}
